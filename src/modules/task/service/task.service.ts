import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "../entity/task.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateTaskDto } from "../dto/create-task.dto";
import { TaskDto } from "../dto/task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";

@Injectable()
export class TaskService {

    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) { }

    async create(task: CreateTaskDto): Promise<TaskDto> {
        const taskEntity = await this.taskRepository.create(task);
        taskEntity.validated = false;
        await this.taskRepository.save(taskEntity);
        return taskEntity;
    }

    async update(id: number, task: UpdateTaskDto): Promise<UpdateResult> {

        const response = await this.taskRepository.update(id, task);

        return response
    }

    async getTasks(): Promise<TaskDto[]> {

        return await this.taskRepository.find();
    }

    async getTask(id: number): Promise<TaskDto> {

        return await this.taskRepository.findOneBy({ id: id })
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.taskRepository.delete(id);
    }

}