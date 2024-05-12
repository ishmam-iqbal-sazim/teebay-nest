import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '@/users/users.service';

import { RegisterDto } from './auth.dtos';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerDTO: RegisterDto) {
    const user = await this.usersService.create(registerDTO);

    return user;
  }

  async login(loginUserDTO) {
    const user = await this.usersService.findByEmailOrThrow(loginUserDTO.email);

    if (user.password !== loginUserDTO.password)
      throw new UnauthorizedException('Invalid user credentials');

    return user;
  }
}
