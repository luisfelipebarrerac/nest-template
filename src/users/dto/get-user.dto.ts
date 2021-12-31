/* eslint-disable camelcase */
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetUserDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly created_on: Date;

  @Expose()
  readonly modified_on: Date;
}
