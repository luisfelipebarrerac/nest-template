import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('local/signin')
  singinLocal(@Body() dto: AuthDto) {
    return this.authService.singinLocal(dto);
  }

  @Post('local/signup')
  singupLocal(@Body() dto: SignUpDto) {
    return this.authService.singupLocal(dto);
  }
}
