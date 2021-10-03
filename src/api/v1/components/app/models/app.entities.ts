import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional } from 'class-validator';

export class App {
  /**
   * The name of the App
   * @example Philip
   */
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 1, description: 'Version of the App' })
  @IsOptional()
  version?: number;

  @ApiProperty({
    example: 'Javascript',
    description: 'The type of the App 1'
  })
  @IsOptional()
  type?: string;
}
