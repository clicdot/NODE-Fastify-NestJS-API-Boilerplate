import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional } from 'class-validator';

export class App {
  @ApiProperty({ example: 'something' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 1, description: 'Version of the App' })
  @IsInt()
  @IsOptional()
  version?: number;

  @ApiProperty({
    example: 'Javascript',
    description: 'The type of the App 1'
  })
  @IsOptional()
  @IsOptional()
  type?: string;
}
