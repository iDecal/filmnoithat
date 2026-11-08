/** Mild luminance-only sharpening: keep flat colors and alpha unchanged. */
export function sharpenLuminance(source, width, height) {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || source.length !== width * height * 4) throw new Error('Invalid image pixels');
  const output = new Uint8ClampedArray(source);
  const luminance = new Float32Array(width * height);
  for (let i = 0; i < luminance.length; i++) luminance[i] = (77 * source[i * 4] + 150 * source[i * 4 + 1] + 29 * source[i * 4 + 2]) / 256;
  const weights = [1, 2, 1];
  for (let y = 1; y < height - 1; y++) for (let x = 1; x < width - 1; x++) {
    const index = y * width + x; let blur = 0; let opaque = true;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const neighbor = index + dy * width + dx;
      if (source[neighbor * 4 + 3] !== 255) opaque = false;
      blur += luminance[neighbor] * weights[dy + 1] * weights[dx + 1];
    }
    const detail = luminance[index] - blur / 16;
    if (!opaque || Math.abs(detail) < 3) continue;
    const offset = index * 4;
    const min = Math.min(source[offset], source[offset + 1], source[offset + 2]);
    const max = Math.max(source[offset], source[offset + 1], source[offset + 2]);
    const adjustment = Math.round(Math.max(-min, Math.min(255 - max, Math.max(-6, Math.min(6, detail * 0.35)))));
    for (let channel = 0; channel < 3; channel++) output[offset + channel] = source[offset + channel] + adjustment;
  }
  return output;
}

export async function prepareProductImage(file) {
  if (typeof createImageBitmap !== "function") throw new Error("Trình duyệt chưa hỗ trợ xử lý ảnh. Hãy tắt làm nét để dùng ảnh gốc.");
  const bitmap = await createImageBitmap(file);
  try {
    if (bitmap.width > 16000 || bitmap.height > 16000 || bitmap.width * bitmap.height > 60000000) throw new Error('Ảnh có kích thước quá lớn. Vui lòng chọn ảnh nhỏ hơn.');
    const scale = Math.min(1, 2048 / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) throw new Error('Trình duyệt chưa hỗ trợ xử lý ảnh. Hãy tắt làm nét để dùng ảnh gốc.');
    context.imageSmoothingEnabled = true; context.imageSmoothingQuality = 'high';
    context.drawImage(bitmap, 0, 0, width, height);
    const pixels = context.getImageData(0, 0, width, height);
    pixels.data.set(sharpenLuminance(pixels.data, width, height)); context.putImageData(pixels, 0, 0);
    const encode = quality => new Promise(resolve => canvas.toBlob(resolve, 'image/webp', quality));
    let blob = await encode(0.96);
    if (blob && blob.size > 5 * 1024 * 1024) blob = await encode(0.9);
    if (!blob || blob.size > 5 * 1024 * 1024) throw new Error('Không tối ưu được ảnh trong giới hạn 5 MB. Hãy tắt làm nét để dùng ảnh gốc.');
    // Canvas may fall back to PNG on browsers without WebP encoding support.
    const extension = blob.type === 'image/webp' ? 'webp' : 'png';
    const name = file.name.replace(/\.[^.]+$/, '') + '-lam-net.' + extension;
    return { file: new File([blob], name, { type: blob.type }), width, height, resized: scale < 1 };
  } finally { bitmap.close(); }
}
