import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDoEntity } from './entities/to-do.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDoEntity)
    private todoRepository: Repository<ToDoEntity>,
  ) { }

  async create(createToDoDto: CreateToDoDto): Promise<ToDoEntity> {
    const newTodo = this.todoRepository.create({
      ...createToDoDto,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    });
    return await this.todoRepository.save(newTodo);
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

  async update(id: number, updateToDoDto: UpdateToDoDto): Promise<ToDoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id } })
    if (!todo) {
      throw new NotFoundException(`Todo with id: ${id} not found.`)
    }

    Object.assign(todo, updateToDoDto)

    todo.dateUpdated = new Date()

    return await this.todoRepository.save(todo)
  }

  async remove(id: number): Promise<ToDoEntity> {
    const existingTodo = await this.findOne(id)
    return await this.todoRepository.remove(
      existingTodo
    )
  }
}
