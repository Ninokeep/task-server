
export class CreateTaskDto {

    readonly author: string;
    readonly description: string;
    readonly validated: boolean = false;
}