import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoryEntity } from '../entities'
import { CreateCategoryDto } from '../dto'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoriesRepo: Repository<CategoryEntity>,
  ) {}

  async save({ name }: CreateCategoryDto): Promise<CategoryEntity> {
    return this.categoriesRepo.save({ name })
  }

  async findAll(): Promise<CategoryEntity[]> {
    return this.categoriesRepo.find()
  }
}
