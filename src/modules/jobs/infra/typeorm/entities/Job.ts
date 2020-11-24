import { Driver } from '@modules/drivers/infra/typeorm/entities/Driver';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  driver_id: string;

  @ManyToOne(() => Driver, driver => driver.jobs)
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('varchar', {
    array: true,
  })
  categories: string[];

  @Column()
  vacancies: number;

  @Column()
  uri?: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

/**
 * Um Motorista pode ter vários Jobs
 * Mas um ou mais Jobs pertencem a apenas um motorista
 */
