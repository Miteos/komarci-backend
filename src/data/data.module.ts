import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Data } from './data.entity';
import { UserModule } from '../user/user.module';
import { DataController } from './data.conntroller';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Data, User]), UserModule],
  providers: [DataService],
  controllers: [DataController],
  exports: [DataService, TypeOrmModule],
})
export class DataModule {}
