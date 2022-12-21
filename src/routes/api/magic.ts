import express from 'express';
import main from '../../main';

interface IMAGE {
  imageName?: string;
  width?: string;
  height?: string;
}

/**
  @param {IMAGE} query 
  @return {null|string}
 */
const checkImage = async (query: IMAGE): Promise<null | string> => {
  if (!(await main.isImageAvailable(query.imageName))) {
    const AvailableImages: string = (await main.AvailableImages()).join(', ');
    return `Image is currently not available. Current images are: ${AvailableImages}.`;
  }
  if (!query.width && !query.height) {
    return null;
  }
  // check size
  const width: number = parseInt(query.width || '');
  if (Number.isNaN(width) || width < 1) {
    return 'width must have a positive number.';
  }
  const height: number = parseInt(query.height || '');
  if (Number.isNaN(height) || height < 1) {
    return 'height must have a positive number.';
  }

  return null;
};

const images: express.Router = express.Router();

images.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const validationMessage: null | string = await checkImage(req.query);
    if (validationMessage) {
      res.send(validationMessage);
      return;
    }

    let error: null | string = '';

    // Create folder if not already created
    if (!(await main.isSizeAvailable(req.query))) {
      error = await main.createImage(req.query);
    }
    // handle error
    if (error) {
      res.send(error);
      return;
    }
    const path: null | string = await main.getImagePath(req.query);
    if (path) {
      res.sendFile(path);
    } else {
      res.send('This should not have happened :-D What did you do?');
    }
  }
);

export default images;
