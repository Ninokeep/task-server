import { TaskController } from "./task.controller"
import { TaskService } from '../service/task.service';
import { Test } from "@nestjs/testing";
import { Task } from "../entity/task.entity";
import { TaskDto } from "../dto/task.dto";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UpdateResult } from "typeorm";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { NotFoundException } from "@nestjs/common";

describe('task controller', () => {
    let taskController: TaskController;
    let taskService: TaskService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                TaskService,
                {
                    provide: getRepositoryToken(Task),
                    useValue: {
                        create: jest.fn().mockImplementation((dto) => dto),
                        save: jest.fn(),
                        findOne: jest.fn().mockImplementation((element) => element.where.name)
                    }
                }
            ],
            controllers: [TaskController]

        }).compile();

        taskService = moduleRef.get<TaskService>(TaskService);
        taskController = moduleRef.get<TaskController>(TaskController);
    })

    it('return a task', async () => {
        const task: TaskDto = {
            id: 1,
            author: "lol",
            description: "read a book",
            validated: false
        }

        jest.spyOn(taskService, 'getTask').mockImplementation(async () => task);

        expect(await taskController.getTask(1)).toEqual(task);
    });

    it('return tasks', async () => {
        const task: TaskDto[] = [
            {
                id: 1,
                author: "lol",
                description: "read a book",
                validated: false
            },
            {
                id: 2,
                author: "eae",
                description: "look a movie",
                validated: false
            }
        ]

        jest.spyOn(taskService, 'getTasks').mockImplementation(async () => task);

        expect(await taskController.getTasks()).toEqual(task);
    });

    it('create a task', async () => {
        const task = {
            id: 1,
            author: "lol",
            description: "read a book",
            validated: false
        };
        jest.spyOn(taskService, 'create').mockImplementation(async () => task);

        expect(await taskController.createTask(task)).toEqual(task);

    });

    it('update a task', async () => {
        const id: number = 1;
        const task: UpdateTaskDto = {
            id: 1,
            author: "lol",
            description: "read a book",
            validated: false
        };
        const updateResult: UpdateResult = new UpdateResult();

        jest.spyOn(taskService, 'update').mockResolvedValue(updateResult);

        expect(taskController.update(id, task)).rejects.toThrow(
            new NotFoundException(`Ressource id : ${id} doesn't exist`),
        );
    });

})