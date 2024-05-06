import { EntityRepository } from '@mikro-orm/postgresql';

import { UserProfile } from '../entities/user-profiles.entity';

export class CustomUserProfilesRepository extends EntityRepository<UserProfile> {}
