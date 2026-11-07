import { callback } from '../../server/cms-oauth.mjs';
export const onRequest = context => callback(context);
