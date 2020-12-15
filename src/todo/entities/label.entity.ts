import { Entity, BaseEntity, PrimaryColumn } from 'typeorm'

@Entity()
export default class LabelEntity extends BaseEntity {
  @PrimaryColumn()
  name: string
}
