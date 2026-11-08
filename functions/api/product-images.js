import { uploadProductImage, deleteProductImage } from '../../server/product-image-upload.mjs';
export const onRequest = context => ['DELETE', 'PATCH'].includes(context.request.method) ? deleteProductImage(context) : uploadProductImage(context);
