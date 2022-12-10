import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ select: true, comment: '注释', default: '123', nullable: true })
  password: string;
  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;
}
