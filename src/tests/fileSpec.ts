import { promises as fs } from 'fs';
import path from 'path';
import File from './../main';

describe('testing project', (): void => {
  it('ERR width must be a positive number', async (): Promise<void> => {
    const error: null | string = await File.createImage({
      imageName: 'foo',
      width: '-100',
      height: '500'
    });
    expect(error).not.toBeNull();
  });

  it('ERR image doesnt exist', async (): Promise<void> => {
    const error: null | string = await File.createImage({
      imageName: 'foo',
      width: '100',
      height: '500'
    });
    expect(error).not.toBeNull();
  });
  it('ERR file already exists', async (): Promise<void> => {
    await File.createImage({ imageName: 'fjord', width: '99', height: '99' });

    const resizedImagePath: string = path.resolve(
      File.imagesNewPath,
      `fjord-99x99.jpg`
    );
    let errorFile: null | string = '';

    try {
      await fs.access(resizedImagePath);
      errorFile = null;
    } catch {
      errorFile = 'ERR file is not created';
    }

    expect(errorFile).toBeNull();
  });
});

afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    File.imagesNewPath,
    'fjord-99x99.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    // Nothing to see here
  }
});
