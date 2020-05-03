'use strict';

import * as fastify from 'fastify';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import * as awsLambdaFastify from 'aws-lambda-fastify';
import {
    Context,
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from 'aws-lambda';
import { start } from '../src/fastify.bootsrap';

interface NestApp {
  app: NestFastifyApplication;
  instance: fastify.FastifyInstance;
}

let cachedNestApp: NestApp;

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  if (!cachedNestApp) {
      cachedNestApp = await start();
  }
  const proxy = awsLambdaFastify(cachedNestApp.instance);

  return proxy(event, context);
};
