import { Injectable } from '@nestjs/common';

import { wrap } from '@mikro-orm/core';

import { RegisterDto } from '@/auth/auth.dtos';

import { UserProfile } from '../common/entities/user-profiles.entity';
import { User } from '../common/entities/users.entity';
import { CustomUserProfilesRepository } from '../common/repositories/custom-user-profiles.repository';

@Injectable()
export class UsersRepository {
  private readonly em;

  constructor(
    private readonly userProfileRepository: CustomUserProfilesRepository,
  ) {
    this.em = this.userProfileRepository.getEntityManager();
  }

  async create(registerDto: RegisterDto) {
    const { email, password, firstName, lastName, address, phoneNumber } =
      registerDto;

    const user = new User(email, password);
    const userProfile = new UserProfile(
      firstName,
      lastName,
      address,
      phoneNumber,
    );

    wrap(userProfile).assign({ user });

    await this.em.persistAndFlush([user, userProfile]);

    return user;
  }
}
