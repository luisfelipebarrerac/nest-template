import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async singinLocal(dto: AuthDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Credentials not valid');
    if (user.password != dto.password)
      throw new UnauthorizedException('Credentials not valid');
    const token = await this.signUser(user.id, user.email, 'user');
    return { message: 'Token provided', result: { token } };
  }

  singupLocal() {}

  async signUser(userId: number, email: string, type: string) {
    const token = this.jwtService.sign({
      sub1: userId,
      email,
      claim: type,
    });
    return token;
  }
}
