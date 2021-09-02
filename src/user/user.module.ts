import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { userController } from './user.controller';
import { Data } from '../data/data.entity';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Data])],
  controllers: [userController],
  providers: [UserService, AuthService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
