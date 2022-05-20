import { INestApplication } from '@nestjs/common';
import { setCors } from './cors';
import { setSecurityHeaders } from './headers';

export function secure(app: INestApplication) {
  setSecurityHeaders(app);
  setCors(app);
}
