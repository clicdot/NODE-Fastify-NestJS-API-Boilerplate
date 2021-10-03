import { AppInterface } from './../models/app.interface';
import { Injectable } from '@nestjs/common';
import { CreateAppDto } from './../models/app.dto';
import { App } from './../models/app.entities';

@Injectable()
export class AppService {
  private readonly app: App[] = [];
  private readonly apps: AppInterface[] = [];

  create(app: CreateAppDto): App[] {
    this.app.push(app);
    return this.app;
  }

  find(): Promise<App[]> {
    return new Promise((resolve, reject) => {
      resolve([
        {
          name: 'test',
          version: 1,
          type: 'javascript'
        }
      ]);
    });
  }

  findAll(): Promise<AppInterface[]> {
    return new Promise((resolve, reject) => {
      resolve([
        {
          name: 'test',
          version: 1,
          type: 'javascript'
        }
      ]);
    });
  }

  findOne(id: number): Promise<App> {
    return new Promise((resolve, reject) => {
      resolve({
        name: 'test',
        version: 1,
        type: 'javascript'
      });
    });
  }
}
