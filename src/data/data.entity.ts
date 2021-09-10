import { Column, OneToOne, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('data')
export class Data {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eggCount_1: string;

  @Column()
  eggCount_2: string;

  @Column()
  eggCount_3: string;

  @Column()
  eggCount_4: string;

  @Column()
  initials: string;

  @Column()
  initial_date: string;

  @Column()
  longitude: string;

  @Column()
  latitude: string;

  @Column()
  media: string;

  @OneToOne(() => User)
  user: User;
}
