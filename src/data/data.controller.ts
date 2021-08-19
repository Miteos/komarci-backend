import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  addData(
    @Body('eggCount_1') eggCount_1: number,
    @Body('eggCount_2') eggCount_2: number,
    @Body('eggCount_3') eggCount_3: number,
    @Body('eggCount_4') eggCount_4: number,
    @Body('initials') initials: string,
    @Body('initial_date') initial_date: string,
    @Body('location') location: string,
    @Body('media') media: string,
  ): any {
    const generatedId = this.dataService.insertData(
      eggCount_1,
      eggCount_2,
      eggCount_3,
      eggCount_4,
      initials,
      initial_date,
      location,
      media,
    );
    return { id: generatedId };
  }
  @Get()
  getAllJobs() {
    return this.dataService.getData();
  }
  @Get(':id')
  getJob(@Param('id') id: string) {
    return this.dataService.getSingleData(id);
  }
  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('eggCount_1') eggCount_1: number,
    @Body('eggCount_2') eggCount_2: number,
    @Body('eggCount_3') eggCount_3: number,
    @Body('eggCount_4') eggCount_4: number,
    @Body('initials') initials: string,
    @Body('initial_date') initial_date: string,
    @Body('location') location: string,
    @Body('media') media: string,
  ) {
    this.dataService.updateData(
      id,
      eggCount_1,
      eggCount_2,
      eggCount_3,
      eggCount_4,
      initials,
      initial_date,
      location,
      media,
    );
    return null;
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    this.dataService.deleteJob(id);
    return null;
  }
}
