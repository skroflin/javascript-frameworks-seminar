import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';

@Controller('to-do')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) { }

  @Post()
  async create(
    @Body() createToDoDto: CreateToDoDto
  ) {
    try {
      await this.toDoService.create(createToDoDto);
      return {
        success: true,
        message: `Todo created successfully.`
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  @Get()
  async findAll() {
    try {
      const data =
        await this.toDoService.findAll();
      return {
        success: true,
        data,
        message: `Todos fetched successfully.`
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data =
        await this.toDoService.findOne(+id);
      return {
        success: true,
        data,
        message: `Todo with id: ${id} fetched successfully.`
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateToDoDto: UpdateToDoDto) {
    try {
      await this.toDoService.update(+id, updateToDoDto);
      return {
        success: true,
        message: `Todo with id: ${id} updated successfully.`
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.toDoService.remove(+id);
      return {
        success: true,
        message: `Todo with id: ${id} deleted successfully.`
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
