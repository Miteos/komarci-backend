import { Controller, Body, Post, Param, Get, Put } from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDataDto } from './dto/create-data.dto';
import { Data } from './data.entity';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  async findAll(): Promise<Data[]> {
    return await this.dataService.all();
  }

  @Get('/:id')
  async findID(@Param() id: string): Promise<Data> {
    return await this.dataService.findByID(id);
  }
  @Post('/:userId')
  async create(
    @Param('userId') userId: number,
    @Body()
    data: CreateDataDto,
  ) {
    return await this.dataService.create(userId, data);
  }

  @Put('/:id')
  async update(@Param() params, @Body() data: CreateDataDto) {
    return this.dataService.update(params.id, data);
  }
}
