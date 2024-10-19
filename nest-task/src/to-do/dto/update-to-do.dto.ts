import { PartialType } from '@nestjs/mapped-types';
import { CreateToDoDto } from './create-to-do.dto';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateToDoDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDate()
    dateUpdated?: Date;

    @IsOptional()
    @IsBoolean()
    isDone?: boolean
}
