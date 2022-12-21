import supertest from 'supertest';
import app from '../index';
import { promises as fs } from 'fs';
import path from 'path';
import main from './../main';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test responses from endpoints', (): void => {
  describe('testing endpoint', (): void => {
    it('returning main', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');

      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /api/images', (): void => {
    it('returning /api/images?imageName=fjord (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?imageName=fjord'
      );

      expect(response.status).toBe(200);
    });

    it('returning /api/images?imageName=fjord&width=199&height=199', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?imageName=fjord&width=199&height=199'
      );

      expect(response.status).toBe(200);
    });

    it('retrieving /api/images?imageName=fjord&width=-200&height=200', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?imageName=fjord&width=-200&height=200'
      );

      expect(response.status).toBe(200);
    });

    it('retrieving api/images', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/images');

      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /foo', (): void => {
    it('Invalid endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/foo');

      expect(response.status).toBe(404);
    });
  });
});

afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    main.imagesNewPath,
    'fjord-199x199.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    // dont look here. it's empty
  }
});
