import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  OneToMany,
  JoinColumn,
  AfterUpdate,
  BeforeUpdate,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('data')
export class DataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  eggCount_1: number;

  @Column()
  eggCount_2: number;

  @Column()
  eggCount_3: number;

  @Column()
  eggCount_4: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @OneToOne(() => User, (user) => user.username) // specify inverse side as a second parameter
  user: User;
}
