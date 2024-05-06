import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomUsersRepository } from 'src/common/repositories/custom-users.repository';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly customUserRepository: CustomUsersRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async findByEmailOrThrow(email: string) {
    const user = await this.customUserRepository.findOneOrFail(
      {
        email,
      },
      {
        populate: ['userProfile'],
      },
    );
    return user;
  }

  async create(registerDto) {
    const existingUser = await this.customUserRepository.findOne({
      email: registerDto.email,
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const newUser = await this.usersRepository.create({
      ...registerDto,
    });

    return newUser;
  }
}
