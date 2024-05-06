import { BadRequestException } from '@nestjs/common';

import {
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
  Rel,
  EntityRepositoryType,
} from '@mikro-orm/core';

import { User } from './users.entity';

import { CustomUserProfilesRepository } from '../repositories/custom-user-profiles.repository';
import { CustomBaseEntity } from './base.entity';

@Entity({
  tableName: 'user_profiles',
  repository: () => CustomUserProfilesRepository,
})
export class UserProfile extends CustomBaseEntity {
  [EntityRepositoryType]?: CustomUserProfilesRepository;

  constructor(
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
  ) {
    super();

    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }

  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ fieldName: 'first_name' })
  firstName!: string;

  @Property({ fieldName: 'last_name' })
  lastName!: string;

  @Property({ fieldName: 'address' })
  address!: string;

  @Property({ fieldName: 'phone_number' })
  phoneNumber!: string;

  @Property({ persist: false })
  get email() {
    return this.user === undefined
      ? new BadRequestException('User not properly defined')
      : this.user.email;
  }

  @OneToOne(() => User, { hidden: true })
  user!: Rel<User>;
}
