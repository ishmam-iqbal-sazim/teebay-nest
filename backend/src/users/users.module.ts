import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/common/entities/users.entity';
import { UserProfile } from 'src/common/entities/user-profiles.entity';

@Module({
  imports: [MikroOrmModule.forFeature([User, UserProfile])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
