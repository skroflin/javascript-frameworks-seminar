import { HttpException, Injectable } from '@nestjs/common';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDoEntity } from './entities/to-do.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDoEntity)
    private readonly todoRepository: Repository<ToDoEntity>,
  ) { }

  async create(
    CreateToDoDto: CreateToDoDto,
  ): Promise<ToDoEntity> {
    const todoData =
      await this.todoRepository.create(
        CreateToDoDto,
      )
    return this.todoRepository.save(todoData)
  }

  async findAll(): Promise<ToDoEntity[]> {
    return await this.todoRepository.find()
  }

  async findOne(id: number): Promise<ToDoEntity> {
    const todoData =
      await this.todoRepository.findOneBy({ id })
    if (!todoData) {
      throw new HttpException(
        `Todo with id: ${id} not found`,
        404
      )
    }
    return todoData
  }

  async update(id: number, updateToDoDto: UpdateToDoDto): Promise<UpdateToDoDto> {
    if (!updateToDoDto.dateUpdated) {
      updateToDoDto.dateUpdated = new Date()
    }
    const existingTodo = await this.findOne(id)
    const todoData = this.todoRepository.merge(
      existingTodo,
      updateToDoDto
    )
    return await this.todoRepository.save(
      todoData
    )
  }

  async remove(id: number): Promise<ToDoEntity> {
    const existingTodo = await this.findOne(id)
    return await this.todoRepository.remove(
      existingTodo
    )
  }
}
