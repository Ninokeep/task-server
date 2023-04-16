import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './modules/task/controller/task.controller';
import { Task } from './modules/task/entity/task.entity';
import { TaskModule } from './modules/task/task.module';
import { TaskService } from './modules/task/service/task.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'tasks',
    entities: [Task],
    synchronize: true,
  }),
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
