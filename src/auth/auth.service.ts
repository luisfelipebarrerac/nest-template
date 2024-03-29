import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async singinLocal(dto: AuthDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Credentials not valid');
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Credentials not valid');
    const token = await this.signUser(user.id, user.email, 'user');
    return { message: 'Token provided', result: { token } };
  }

  async singupLocal(dto: SignUpDto) {
    const user = await this.userService.create(dto);
    return { result: { user } };
  }

  async signUser(userId: number, email: string, type: string) {
    const token = this.jwtService.sign({
      sub1: userId,
      email,
      claim: type,
    });
    return token;
  }
}
