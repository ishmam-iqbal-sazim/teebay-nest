import {
  Entity,
  EntityRepositoryType,
  OneToOne,
  PrimaryKey,
  Property,
  Rel,
} from '@mikro-orm/core';

import { CustomBaseEntity } from './base.entity';

import { CustomUsersRepository } from '../repositories/custom-users.repository';
import { UserProfile } from './user-profiles.entity';

@Entity({
  tableName: 'users',
  repository: () => CustomUsersRepository,
})
export class User extends CustomBaseEntity {
  [EntityRepositoryType]?: CustomUsersRepository;

  constructor(email: string, password?: string) {
    super();

    this.email = email;
    this.password = password;
  }

  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ unique: true })
  email!: string;

  @Property({ nullable: true })
  password?: string | null;

  @OneToOne(() => UserProfile, { mappedBy: (userProfile) => userProfile.user })
  userProfile!: Rel<UserProfile>;
}
