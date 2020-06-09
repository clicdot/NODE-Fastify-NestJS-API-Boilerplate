import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ type: 'string' })
  clientId: string;

  @ApiProperty({ type: 'string' })
  secretKey: string;
}
