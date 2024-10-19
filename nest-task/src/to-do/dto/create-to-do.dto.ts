import { Type } from "@nestjs/class-transformer";
import { IsBoolean, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateToDoDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsDateString()
    @Type(() => Date)
    dateCreated: Date;

    @IsNotEmpty()
    @IsBoolean()
    isDone: boolean
}