import {
  Collection,
  Entity,
  EntityRepositoryType,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
  Rel,
} from '@mikro-orm/core';

import { CustomBaseEntity } from './base.entity';

import { CustomUsersRepository } from '../repositories/custom-users.repository';
import { UserProfile } from './user-profiles.entity';
import { Product } from './products.entity';

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

  @Property({ fieldName: 'email', unique: true })
  email!: string;

  @Property({ fieldName: 'password' })
  password!: string;

  @OneToOne(() => UserProfile, { mappedBy: (userProfile) => userProfile.user })
  userProfile!: Rel<UserProfile>;

  @OneToMany(() => Product, (product) => product.user)
  products = new Collection<Product>(this);
}
