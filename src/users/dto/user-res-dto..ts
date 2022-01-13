/* eslint-disable camelcase */
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly surname: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly is_deleted: boolean;

  @Expose()
  readonly created_on: Date;

  @Expose()
  readonly modified_on: Date;
}
