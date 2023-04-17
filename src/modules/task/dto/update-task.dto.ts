import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto {

    readonly id: number;
    @IsString()
    @IsOptional()
    readonly author: string;
    @IsString()
    @IsOptional()
    readonly description: string;
    @IsBoolean()
    @IsOptional()
    readonly validate: boolean;
}