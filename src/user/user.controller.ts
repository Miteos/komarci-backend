import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserRO } from './user.interface';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  async findMe(@User('username') email: string): Promise<UserRO> {
    return await this.userService.findByEmail(email);
  }

  @Put('user')
  async update(
    @User('id') userId: number,
    @Body('user') userData: UpdateUserDto,
  ) {
    return await this.userService.update(userId, userData);
  }

  @Post('users')
  async create(@Body('user') userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Delete('user/:slug')
  async delete(@Param() params) {
    return await this.userService.delete(params.slug);
  }

  @UsePipes(new ValidationPipe())
  @Post('user/login')
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO> {
    const _user = await this.userService.findOne(loginUserDto);

    const errors = { User: ' not found' };
    if (!_user) throw new HttpException({ errors }, 401);

    const token = await this.userService.generateJWT(_user);
    const { email, username, bio, image } = _user;
    const user = { email, token, username, bio, image };
    return { user };
  }
}
