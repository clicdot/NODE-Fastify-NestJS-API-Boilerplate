import { IsInt, IsString } from 'class-validator';

export class CreateAppDto {
  @IsString()
  readonly name?: string;

  @IsInt()
  readonly version?: number;

  @IsString()
  readonly type?: string;
}
