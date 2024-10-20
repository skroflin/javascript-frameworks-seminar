import { Type } from "@nestjs/class-transformer";
import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateToDoDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsDateString()
    @Type(() => Date)
    dateCreated: Date;

    @IsNotEmpty()
    @IsBoolean()
    isDone: boolean
}