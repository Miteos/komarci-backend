import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { getRepository, Repository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { CreateUserDto, LoginUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['data'],
    });
  }
  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username } });
  }
  async findByID(id: number): Promise<User> {
    return await this.userRepository.findOne({ id: id });
  }
  async createUser(addUser: CreateUserDto): Promise<User> {
    const newUser = await this.userRepository.save(addUser);
    return this.userRepository.save(newUser);
  }
  async create(payload: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.username = payload.username;
    newUser.password = payload.password;

    const username = payload.username;
    const qb = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', { username });

    const user = await qb.getOne();
    if (user) {
      const errors = { username: 'Username must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.userRepository.save(newUser);
  }

  async validateUser(loginDto: LoginUserDto): Promise<User> {
    const password = loginDto.password;
    const username = loginDto.username;
    const user = await this.userRepository.findOne({ username: username });
    if (user && user.password === password) {
      const { ...result } = user;
      return result;
    }
    if (!user) {
      throw new UnauthorizedException('User not forund');
    }
    if (user && user.password !== password) {
      throw new UnauthorizedException('Password incorrect');
    }
    return null;
  }
}
