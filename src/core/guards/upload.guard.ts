import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class UploadGuard implements CanActivate {
  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req: any = ctx.switchToHttp().getRequest() as FastifyRequest;
    const isMultipart = req.isMultipart();
    if (!isMultipart)
      throw new BadRequestException('multipart/form-data expected.');
    const files = req.files();
    if (!files) throw new BadRequestException('file expected');
    req.incomingFile = files;
    return true;
  }
}
