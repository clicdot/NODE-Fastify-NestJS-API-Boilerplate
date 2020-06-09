import { Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { AuthDto } from './authDto';
import { AccessTokenDto } from './accessTokenDto';

@ApiTags('Token Generator')
@Controller('auth')
export class TokenController {
  @Post('token')
  @ApiBody({
    description: 'Auth Token Generator',
    type: AuthDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Auth token created',
    type: AccessTokenDto
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: Sample not found'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden'
  })
  postToken() {
    return {
      hello: 'world'
    };
  }
}
