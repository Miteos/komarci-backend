import { Column, OneToOne, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('data')
export class Data {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eggCount_1: number;

  @Column()
  eggCount_2: number;

  @Column()
  eggCount_3: number;

  @Column()
  eggCount_4: number;

  @Column()
  initials: string;

  @Column()
  initial_date: string;

  @Column()
  location: string;

  @Column()
  media: string;

  @OneToOne(() => User)
  user: User;
}
