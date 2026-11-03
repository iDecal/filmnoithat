export interface NavigationLink {
  label: string;
  href: string;
}

export interface NavigationItem extends NavigationLink {
  children?: NavigationLink[];
}

export const site = {
  name: "Film Nội Thất",
  tagline: "Vật liệu & thi công cùng iDecal",
  phone: "0866 077 040",
  phoneHref: "tel:0866077040",
  zaloHref: "https://zalo.me/0866077040",
  email: "contact@filmnoithat.vn",
  serviceArea: "TP. Hồ Chí Minh & Bình Dương",
};

export const serviceLinks: NavigationLink[] = [
  { label: "Dán film bàn & kệ", href: "/dich-vu/dan-film-ban/" },
  { label: "Dán film tủ bếp", href: "/dich-vu/dan-film-tu-bep/" },
  { label: "Dán film tường", href: "/dich-vu/dan-film-tuong/" },
  { label: "Dán film trần", href: "/dich-vu/dan-film-tran/" },
  { label: "Dán film thang máy", href: "/dich-vu/dan-film-thang-may/" },
];

export const materialLinks: NavigationLink[] = [
  { label: "Film vân gỗ", href: "/vat-lieu/van-go/" },
  { label: "Film vân đá cẩm thạch", href: "/vat-lieu/da-cam-thach/" },
  { label: "Film đơn sắc", href: "/vat-lieu/don-sac/" },
  { label: "Film vân vải", href: "/vat-lieu/van-vai/" },
  { label: "Film vân bê tông", href: "/vat-lieu/be-tong/" },
  { label: "Film kim loại", href: "/vat-lieu/kim-loai/" },
  { label: "Film tráng gương", href: "/vat-lieu/trang-guong/" },
];

export const companyLinks: NavigationLink[] = [
  { label: "Giới thiệu", href: "/gioi-thieu/" },
  { label: "Công trình", href: "/cong-trinh/" },
  { label: "Kiến thức nội thất", href: "/blog/" },
  { label: "Liên hệ", href: "/lien-he/" },
];

export const navigation: NavigationItem[] = [
  {
    label: "Dịch vụ",
    href: "/dich-vu/dan-film-noi-that/",
    children: [
      { label: "Tổng quan dịch vụ", href: "/dich-vu/dan-film-noi-that/" },
      ...serviceLinks,
    ],
  },
  {
    label: "Vật liệu",
    href: "/vat-lieu/",
    children: [{ label: "Tất cả vật liệu", href: "/vat-lieu/" }, { label: "Mẫu film theo mã", href: "/san-pham/" }, ...materialLinks],
  },
  ...companyLinks,
];

export const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";
export const isCurrentPage = (path: string, href: string) => normalizePath(path) === normalizePath(href);
export const isCurrentSection = (path: string, item: NavigationItem) =>
  isCurrentPage(path, item.href) || !!item.children?.some(link => isCurrentPage(path, link.href) || normalizePath(path).startsWith(`${normalizePath(link.href)}/`));
