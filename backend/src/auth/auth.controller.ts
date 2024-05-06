import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto) {
    const user = this.authService.register(registerDto);

    return user;
  }

  @Post('login')
  login(@Body() loginDto) {
    return this.authService.login(loginDto);
  }
}
