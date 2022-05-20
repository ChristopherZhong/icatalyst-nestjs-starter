import { INestApplication } from '@nestjs/common';
import { secure } from './index';

describe('security', () => {
  it('should call the associated functions', () => {
    const app = {
      enableCors: jest.fn(),
      use: jest.fn(),
    } as unknown as INestApplication;

    secure(app);

    expect(app.use).toBeCalledTimes(1);
    expect(app.enableCors).toBeCalledTimes(1);
  });
});
