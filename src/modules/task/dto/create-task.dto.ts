import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {

    @IsString()
    readonly author: string;
    @IsString()
    readonly description: string;
    @IsBoolean()
    @IsOptional()
    readonly validated?: boolean = false;
}