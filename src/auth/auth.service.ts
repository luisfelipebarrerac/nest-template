import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  singinLocal(dto: AuthDto) {}

  singupLocal() {}
}
