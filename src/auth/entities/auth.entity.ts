import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AuthEntity {
  @Expose()
  @ApiProperty()
  accessToken: string;

  constructor(partial: Partial<AuthEntity>) {
    Object.assign(this, partial);
  }
}
