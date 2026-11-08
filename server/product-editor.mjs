const API='https://api.github.com/repos/iDecal/filmnoithat';
const brands=['INFEEL','Corance','TODA'];
const categories=['van-go','don-sac','van-vai','be-tong','kim-loai','da-cam-thach','trang-guong'];
const limits={name:200,code:80,group:200,collection:200,rollSpecification:100,seoTitle:250,seoDescription:1000};
const required=['name','code','group','collection','rollSpecification'];
const decode=value=>JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(value.replace(/\s/g,'')),c=>c.charCodeAt(0))));
const encode=value=>{const bytes=new TextEncoder().encode(JSON.stringify(value,null,2)+'\n');let result='';for(const byte of bytes)result+=String.fromCharCode(byte);return btoa(result);};
const same=(a,b)=>JSON.stringify(a??null)===JSON.stringify(b??null);
const photoFor=(product,src)=>product.image===src?{alt:product.imageAlt||'',title:product.imageTitle||''}:(product.gallery||[]).find(photo=>photo.src===src);
export async function productEditor({request,env},fetcher=fetch){
 const reply=(message,status=400,extra={})=>Response.json({message,...extra},{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
 if(!['GET','PATCH'].includes(request.method))return reply('Phương thức không hợp lệ.',405);
 const origin=new URL(env.CMS_SITE_URL||'https://filmnoithat.pages.dev').origin;
 if(new URL(request.url).origin!==origin||(request.headers.has('Origin')&&request.headers.get('Origin')!==origin)||(request.method==='PATCH'&&request.headers.get('Origin')!==origin))return reply('Nguồn yêu cầu không hợp lệ.',403);
 const authorization=request.headers.get('Authorization')||'';
 if(!/^Bearer [^\s]+$/.test(authorization))return reply('Vui lòng đăng nhập quản trị.',401);
 let input;
 if(request.method==='GET')input=Object.fromEntries(new URL(request.url).searchParams);
 else{
  try{
   const reader=request.body?.getReader();if(!reader)throw new Error();let text='';let size=0;const decoder=new TextDecoder();
   while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>65536){await reader.cancel();return reply('Nội dung chỉnh sửa quá lớn.',413);}text+=decoder.decode(value,{stream:true});}
   input=JSON.parse(text+decoder.decode());
  }catch{return reply('Nội dung chỉnh sửa không hợp lệ.');}
 }
 if(!input||typeof input!=='object'||typeof input.slug!=='string'||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug)||!brands.includes(input.brand))return reply('Sản phẩm không hợp lệ.');
 const {slug,brand}=input;
 const changes=input.changes||{};const base=input.base||{};const photos=input.photos||[];
 if(request.method==='PATCH'){
  if(!changes||typeof changes!=='object'||Array.isArray(changes)||!base||typeof base!=='object'||Array.isArray(base)||!Array.isArray(photos)||photos.length>150)return reply('Dữ liệu chỉnh sửa không hợp lệ.');
  for(const [key,value]of Object.entries(changes)){
   if(!Object.hasOwn(base,key))return reply('Thiếu dữ liệu gốc. Hãy mở lại trình sửa.',409);
   if(Object.hasOwn(limits,key)){if(typeof value!=='string'||value.length>limits[key]||(required.includes(key)&&!value.trim()))return reply(`Thông tin ${key} không hợp lệ.`);changes[key]=value.trim();}
   else if(key==='brand'){if(!brands.includes(value))return reply('Thương hiệu không hợp lệ.');}
   else if(key==='category'){if(!categories.includes(value))return reply('Nhóm vật liệu không hợp lệ.');}
   else if(key==='pricePerMetre'){if(value!==null&&(!Number.isSafeInteger(value)||value<1||value>1000000000))return reply('Giá phải là số nguyên dương bằng VND hoặc để trống để liên hệ báo giá.');}
   else if(key==='color'){if(!value||typeof value!=='object'||typeof value.name!=='string'||!value.name.trim()||value.name.length>100||typeof value.family!=='string'||!value.family.trim()||value.family.length>100||typeof value.value!=='string'||!/^#[a-f\d]{6}$/i.test(value.value))return reply('Màu sắc không hợp lệ.');changes.color={name:value.name.trim(),family:value.family.trim(),value:value.value};}
   else return reply('Trường chỉnh sửa không được hỗ trợ.');
  }
  for(const photo of photos)if(!photo||typeof photo.src!=='string'||!photo.src.startsWith('/images/')||photo.src.includes('..')||!photo.base||typeof photo.alt!=='string'||!photo.alt.trim()||photo.alt.length>500||typeof photo.title!=='string'||photo.title.length>250)return reply('Tiêu đề hoặc ALT ảnh không hợp lệ.');
 }
 const headers={Authorization:authorization,Accept:'application/vnd.github+json','Content-Type':'application/json','User-Agent':'filmnoithat-product-editor'};
 const api=async(path,method='GET',body)=>{const response=await fetcher(API+path,{method,headers,...(body?{body:JSON.stringify(body)}:{})});return {status:response.status,ok:response.ok,data:response.ok?await response.json():null};};
 try{
  const access=await api('');if(access.status===401)return reply('Phiên đăng nhập hết hạn.',401);if(!access.ok||!access.data.permissions?.push)return reply('Tài khoản chưa có quyền sửa website.',403);
  const path=`src/content/products/${brand.toLowerCase()}/${slug}.json`;
  for(let attempt=0;attempt<3;attempt++){
   const head=await api('/git/ref/heads/main');if(!head.ok)throw new Error();const sha=head.data.object.sha;
   const current=await api(`/contents/${path}?ref=${sha}`);if(!current.ok||current.data.type!=='file'||current.data.encoding!=='base64')return reply('Không tìm thấy sản phẩm. Có thể sản phẩm đã được xóa hoặc chuyển thương hiệu.',404);
   const product=decode(current.data.content);if(product.slug!==slug||product.brand!==brand)return reply('Thông tin sản phẩm không khớp.',409);
   if(request.method==='GET')return reply('Đã tải thông tin sản phẩm.',200,{product});
   for(const key of Object.keys(changes))if(!same(product[key],base[key]))return reply('Thông tin vừa được chỉnh sửa ở nơi khác. Đóng rồi mở lại trình sửa để lấy bản mới nhất.',409);
   for(const photo of photos){const original=photoFor(product,photo.src);if(!original||!same(original.alt||'',photo.base.alt||'')||!same(original.title||'',photo.base.title||''))return reply('Ảnh vừa được thay đổi ở nơi khác. Hãy mở lại trình sửa.',409);}
   Object.assign(product,changes);
   for(const photo of photos){if(product.image===photo.src){product.imageAlt=photo.alt.trim();product.imageTitle=photo.title.trim();}else{const target=photoFor(product,photo.src);target.alt=photo.alt.trim();target.title=photo.title.trim();}}
   const destination=`src/content/products/${product.brand.toLowerCase()}/${slug}.json`;
   if(destination!==path){const target=await api(`/contents/${destination}?ref=${sha}`);if(target.ok)return reply('Thương hiệu đích đã có sản phẩm cùng đường dẫn.',409);if(target.status!==404)throw new Error();}
   // Check codes against existing records, including codes changed by earlier edits.
   if(Object.hasOwn(changes,'code')||destination!==path){
    const directory=await api(`/contents/src/content/products/${product.brand.toLowerCase()}?ref=${sha}`);if(!directory.ok||!Array.isArray(directory.data))throw new Error();
    const normalized=product.code.toUpperCase().replace(/\s/g,'');
    const files=directory.data.filter(file=>file.type==='file'&&file.name.endsWith('.json')&&file.path!==path);
    // Batch blob reads through GraphQL to stay within Pages subrequest limits.
    for(let offset=0;offset<files.length;offset+=100){
     const batch=files.slice(offset,offset+100);
     const query=`query { repository(owner:"iDecal",name:"filmnoithat") { ${batch.map((file,index)=>`p${index}: object(expression:${JSON.stringify(`${sha}:${file.path}`)}) { ... on Blob { text } }`).join(' ')} } }`;
     const response=await fetcher('https://api.github.com/graphql',{method:'POST',headers,body:JSON.stringify({query})});
     if(!response.ok)throw new Error();const result=await response.json();if(result.errors||!result.data?.repository)throw new Error();
     for(let index=0;index<batch.length;index++){
      const text=result.data.repository[`p${index}`]?.text;if(typeof text!=='string')throw new Error();
      if(JSON.parse(text).code.toUpperCase().replace(/\s/g,'')===normalized)return reply('Thương hiệu này đã có sản phẩm cùng mã.',409);
     }
    }
   }
   if(!Object.keys(changes).length&&!photos.length)return reply('Không có thay đổi cần lưu.',200,{product});
   const parent=await api(`/git/commits/${sha}`);if(!parent.ok)throw new Error();
   const blob=await api('/git/blobs','POST',{content:encode(product),encoding:'base64'});if(!blob.ok)throw new Error();
   const files=[{path:destination,mode:'100644',type:'blob',sha:blob.data.sha}];if(destination!==path)files.push({path,mode:'100644',type:'blob',sha:null});
   const tree=await api('/git/trees','POST',{base_tree:parent.data.tree.sha,tree:files});if(!tree.ok)throw new Error();
   const commit=await api('/git/commits','POST',{message:`Edit product ${product.brand} ${product.code}`,parents:[sha],tree:tree.data.sha});if(!commit.ok)throw new Error();
   const update=await api('/git/refs/heads/main','PATCH',{sha:commit.data.sha,force:false});
   if(update.ok)return reply('Đã lưu thay đổi. Website đang cập nhật; khách sẽ thấy bản mới sau khi triển khai hoàn tất.',200,{product,commit:commit.data.sha});
   if(![409,422].includes(update.status))throw new Error();
  }
  return reply('Website đang có thay đổi mới. Vui lòng lưu lại.',409);
 }catch{return reply('Chưa lưu được sản phẩm. Vui lòng thử lại.',502);}
}
