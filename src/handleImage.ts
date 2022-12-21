import sharp from 'sharp';

interface Resize {
  source: string;
  target: string;
  width: number;
  height: number;
}

/**
  @param {sharpResizeParams} params
  @param {string} params.source 
  @param {string} params.target 
  @param {number} params.width 
  @param {number} params.height
  @return {null|string} 
 */
const handleImage = async (params: Resize): Promise<null | string> => {
  try {
    await sharp(params.source)
      .resize(params.width, params.height)
      .toFormat('jpeg')
      .toFile(params.target);
    return null;
  } catch {
    return 'ERR image is not proccessing';
  }
};

export default handleImage;
