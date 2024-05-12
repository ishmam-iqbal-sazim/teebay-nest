import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dtos';
import { serialize } from '@mikro-orm/core';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);

    return serialize(user, {
      skipNull: true,
      forceObject: true,
      exclude: ['password'],
      populate: ['userProfile'],
    });
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);

    return serialize(user, {
      skipNull: true,
      forceObject: true,
      exclude: ['password'],
      populate: ['userProfile'],
    });
  }
}
