import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

export const File = createParamDecorator(
  async (_data: unknown, ctx: ExecutionContext) => {
    const req: any = ctx.switchToHttp().getRequest() as FastifyRequest;
    const files = await req.incomingFile;
    return files;
  }
);
