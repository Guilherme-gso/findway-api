import { Job } from '@modules/jobs/infra/typeorm/entities/Job';
import { User } from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('drivers')
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Job, job => job.driver)
  jobs: Job[];

  @Column()
  user_id: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  company: string;

  @Column()
  cpf: string;

  @Column()
  cnpj: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

/**
 * USER <=> DRIVER
 * ON
 */
