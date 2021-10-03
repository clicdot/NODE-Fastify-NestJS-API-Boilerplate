import { ConfigService } from '@nestjs/config';
import { start } from './fastify.bootstrap';

export const bootstrap = async () => {
  const app = await start();

  const configService = app.get(ConfigService);
  const port = configService.get('PORT_TARGET');

  await app.listen(port, '0.0.0.0');
};
