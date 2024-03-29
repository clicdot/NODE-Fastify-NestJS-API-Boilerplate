import { UnauthorizedException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

export = fp(async (fastify: any) => {
  fastify.addHook('onRequest', async (request: FastifyRequest) => {
    let runAuthCheck = true;
    const excludedRoutes = ['/swagger/'];
    const path = request.raw.url;

    excludedRoutes.forEach((route: any) => {
      if (path.includes(route)) {
        runAuthCheck = false;
      }
    });

    // const token = fastify.jwt.sign({
    //   company: 'visa'
    // });

    try {
      if (runAuthCheck) {
        if (request.headers.authorization) {
          // const auth = await request.jwtVerify();
          //
          // request.companyId = auth.companyID;
        } else {
          throw Object.assign(
            {},
            {
              errors: 'Authorization Error: No Access token provided.',
              code: 401
            }
          );
        }
      }
    } catch (error) {
      throw new UnauthorizedException(error.errors);
    }
  });
});
