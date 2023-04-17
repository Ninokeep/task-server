import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class TaskDto {

    readonly id: number;
    @IsNotEmpty()
    @IsString()
    readonly author: string;
    @IsNotEmpty()
    @IsString()
    description: string;
    @IsNotEmpty()
    @IsBoolean()
    readonly validated: boolean;
}