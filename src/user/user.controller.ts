import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller()
export class userController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/user/all')
  async findAll() {
    return await this.userService.all();
  }
  @Get('user/:username')
  async findUsername(@Param('username') username) {
    return await this.userService.findByUsername(username);
  }
  @Get('user/:id')
  async findID(@Param() id) {
    return await this.userService.findByID(id);
  }

  // @UsePipes(ValidationPipe)
  @Post('user/create')
  async create(@Body() payload: CreateUserDto) {
    return await this.userService.create(payload);
  }

  @Post('user/login')
  async login(@Body() payload: LoginUserDto) {
    return await this.userService.validateUser(payload);
  }
}
