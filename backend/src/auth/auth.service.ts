import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  register(registerDTO) {
    const user = this.usersService.create(registerDTO);

    return user;
  }

  async login(loginUserDTO) {
    const user = await this.usersService.findByEmailOrThrow(loginUserDTO.email);

    if (user.password !== loginUserDTO.password)
      throw new UnauthorizedException('Invalid user credentials');

    const userResponse = {
      firstName: user.userProfile.firstName,
      lastName: user.userProfile.lastName,
      address: user.userProfile.address,
      phoneNumber: user.userProfile.phoneNumber,
      email: user.email,
    };

    return userResponse;
  }
}
