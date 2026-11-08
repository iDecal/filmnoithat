import { uploadProductImage, deleteProductImage } from '../../server/product-image-upload.mjs';
export const onRequest = context => context.request.method === 'DELETE' ? deleteProductImage(context) : uploadProductImage(context);
