import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { DataEntity } from '../data/data.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany((type) => UserEntity, (user) => user.data)
  data: [];
}
