import { Injectable, NotFoundException } from '@nestjs/common';
import { Data } from './data.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DataService {
  data: Data[] = [];

  insertData(
    eggCount_1: number,
    eggCount_2: number,
    eggCount_3: number,
    eggCount_4: number,
    initials: string,
    initial_date: string,
    location: string,
    media: string,
  ) {
    const dataId = uuidv4();
    const newData = new Data(
      dataId,
      eggCount_1,
      eggCount_2,
      eggCount_3,
      eggCount_4,
      initials,
      initial_date,
      location,
      media,
    );
    this.data.push(newData);
    return dataId;
  }
  getData() {
    return [...this.data];
  }
  getSingleData(dataId: string) {
    const singleData = this.findData(dataId);
    return { ...singleData };
  }

  private findData(id: string): [Data, number] {
    const dataIndex = this.data.findIndex((dataId) => dataId.id === id);
    const data = this.data[dataIndex];
    if (!data) {
      throw new NotFoundException('Podatci nisu pronađeni.');
    }
    return [data, dataIndex];
  }

  updateData(
    id: string,
    eggCount_1: number,
    eggCount_2: number,
    eggCount_3: number,
    eggCount_4: number,
    initials: string,
    initial_date: string,
    location: string,
    media: string,
  ) {
    const [singleData, index] = this.findData(id);
    const updatedData = { ...singleData };
    if (eggCount_1) {
      updatedData.eggCount_1 = eggCount_1;
    }
    if (eggCount_2) {
      updatedData.eggCount_2 = eggCount_2;
    }
    if (eggCount_3) {
      updatedData.eggCount_3 = eggCount_3;
    }
    if (eggCount_4) {
      updatedData.eggCount_4 = eggCount_4;
    }
    if (initials) {
      updatedData.initials = initials;
    }
    if (initial_date) {
      updatedData.initial_date = initial_date;
    }
    if (location) {
      updatedData.location = location;
    }
    if (media) {
      updatedData.media = media;
    }
    this.data[index] = updatedData;
  }

  deleteJob(id: string) {
    const index = this.findData(id)[1];
    this.data.splice(index, 1);
  }
}
