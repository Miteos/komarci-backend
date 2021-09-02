import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Data } from './data.entity';
import { Repository } from 'typeorm';
import { CreateDataDto } from './dto/create-data.dto';
import { User } from '../user/user.entity';
import { dataRO } from './data.interface';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Data)
    private readonly dataRepository: Repository<Data>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async all(): Promise<Data[]> {
    return await this.dataRepository.find();
  }
  async findByID(id: string) {
    return await this.dataRepository.findOne(id);
  }
  async create(userId: number, newData: CreateDataDto): Promise<Data> {
    const dataId = userId;
    const data = new Data();
    data.eggCount_1 = newData.eggCount_1;
    data.eggCount_2 = newData.eggCount_2;
    data.eggCount_3 = newData.eggCount_3;
    data.eggCount_4 = newData.eggCount_4;
    data.initials = newData.initials;
    data.initial_date = newData.initial_date;
    data.location = newData.location;
    data.media = newData.media;

    const createdData = await this.dataRepository.save(data);
    const user = await this.userRepository.findOne(dataId);
    user.data = data;
    await this.userRepository.save(user);

    return createdData;
  }

  async update(id: string, updatedData: any): Promise<dataRO> {
    const toUpdate = await this.dataRepository.findOne(id);
    const updated = Object.assign(toUpdate, updatedData);
    const data = await this.dataRepository.save(updated);
    return { data };
  }
}
