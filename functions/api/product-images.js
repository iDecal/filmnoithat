import { uploadProductImage } from '../../server/product-image-upload.mjs';
export const onRequest = context => uploadProductImage(context);
