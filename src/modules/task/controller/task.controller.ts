import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "../service/task.service";
import { CreateTaskDto } from "../dto/create-task.dto";
import { TaskDto } from "../dto/task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";


@Controller('tasks')
export class TaskController {

    constructor(private taskService: TaskService) { }

    @Post()
    async createTask(@Body() task: CreateTaskDto): Promise<TaskDto> {
        return await this.taskService.create(task);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() task: UpdateTaskDto
    ): Promise<UpdateTaskDto[]> {
        const response = await this.taskService.update(id, task);

        if (response.affected !== 1) {
            throw new NotFoundException(`Ressource id : ${id} doesn't exist`);
        }

        return [task]
    }

    @Get()
    async getTasks(): Promise<TaskDto[]> {

        return this.taskService.getTasks();
    }

    @Get(':id')
    async getTask(@Param('id') id: number): Promise<TaskDto> {

        const task = await this.taskService.getTask(id);

        if (!task) {
            throw new NotFoundException(`Ressource id : ${id} doesn't exist`)
        }

        return this.taskService.getTask(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {

        const taskDeleted = await this.taskService.delete(id);

        if (taskDeleted.affected !== 1) {
            throw new NotFoundException(`Ressource id : ${id} doesn't exist`)
        }
        return { message: `Ressource id  : ${id} deleted` };
    }

}