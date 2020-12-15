import { In, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { LabelEntity } from '../entities'
import { CreateLabelDto } from '../dto'

@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(LabelEntity)
    private readonly labelsRepo: Repository<LabelEntity>,
  ) {}

  async save({ name }: CreateLabelDto): Promise<LabelEntity> {
    return this.labelsRepo.save({ name })
  }

  async saveBulk(names: string[]): Promise<LabelEntity[]> {
    return this.labelsRepo.save(names.map((name) => ({ name })))
  }

  async delete(name: string): Promise<string> {
    await this.labelsRepo.delete(name)
    return name
  }

  async findAll(): Promise<LabelEntity[]> {
    return this.labelsRepo.find()
  }
}
