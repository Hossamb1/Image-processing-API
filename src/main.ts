import { promises as fs } from 'fs';
import path from 'path';
import handleImage from './handleImage';

interface IMAGE {
  imageName?: string;
  width?: string;
  height?: string;
}

export default class main {
  // Default paths
  static imagesFullPath = path.resolve(__dirname, '../assets/images/full');
  static imagesNewPath = path.resolve(__dirname, '../assets/images/new');

  /**
    @param {IMAGE}params 
    @param {string}[params.imageName] 
    @param {string}[params.width] 
    @param {string}[params.height] 
    @return {null|string}
   */
  static async getImagePath(params: IMAGE): Promise<null | string> {
    if (!params.imageName) {
      return null;
    }

    const mainPath: string =
      params.width && params.height
        ? path.resolve(
            main.imagesNewPath,
            `${params.imageName}-${params.width}x${params.height}.jpg`
          )
        : path.resolve(main.imagesFullPath, `${params.imageName}.jpg`);

    try {
      await fs.access(mainPath);
      return mainPath;
    } catch {
      return null;
    }
  }

  /**
    @param {string} [imageName='']
    @return {boolean} 
   */
  static async isImageAvailable(imageName: string = ''): Promise<boolean> {
    if (!imageName) {
      return false;
    }

    return (await main.AvailableImages()).includes(imageName);
  }

  /**
    @return {string[]}
   */
  static async AvailableImages(): Promise<string[]> {
    try {
      return (await fs.readdir(main.imagesFullPath)).map(
        (imageName: string): string => imageName.split('.')[0]
      );
    } catch {
      return [];
    }
  }

  /**
    @param {IMAGE} params 
    @param {string} [params.imageName] 
    @param {string} [params.width] 
    @param {string} [params.height] 
    @return {boolean}
   */
  static async isSizeAvailable(params: IMAGE): Promise<boolean> {
    if (!params.imageName || !params.width || !params.height) {
      return false;
    }

    // Set the main path
    const mainPath: string = path.resolve(
      main.imagesNewPath,
      `${params.imageName}-${params.width}x${params.height}.jpg`
    );

    try {
      await fs.access(mainPath);
      return true;
    } catch {
      return false;
    }
  }

  static async createNewPath(): Promise<void> {
    try {
      await fs.access(main.imagesNewPath);
    } catch {
      fs.mkdir(main.imagesNewPath);
    }
  }

  /**
   * Create New Image
   * @param {IMAGE} params
   * @param {string} [params.imageName]
   * @param {string} [params.width]
   * @param {string} [params.height]
   * @return {null|string}
   */
  static async createImage(params: IMAGE): Promise<null | string> {
    if (!params.imageName || !params.width || !params.height) {
      return null;
    }

    const mainPathFull: string = path.resolve(
      main.imagesFullPath,
      `${params.imageName}.jpg`
    );
    const mainSizedImage: string = path.resolve(
      main.imagesNewPath,
      `${params.imageName}-${params.width}x${params.height}.jpg`
    );

    console.log(`Creating Image ${mainSizedImage}`);

    // Resizing Image
    return await handleImage({
      source: mainPathFull,
      target: mainSizedImage,
      width: parseInt(params.width),
      height: parseInt(params.height)
    });
  }
}
