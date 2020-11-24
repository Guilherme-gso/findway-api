import { ICoordinatesDTO } from '../dtos/ICoordinatesDTO';
import { ICreateJobDTO } from '../dtos/ICreateJobDTO';
import { Job } from '../infra/typeorm/entities/Job';

export interface IFilterJob {
  categories?: string[];
  min_vacancies?: number;
  max_vacancies?: number;
}

export interface IJobsRepository {
  create(data: ICreateJobDTO): Promise<Job>;
  findAllJobs(): Promise<Job[]>;
  findById(id: string): Promise<Job | undefined>;
  findByTitle(title: string): Promise<Job | undefined>;
  findByCategories(categories: string[] | string): Promise<Job[]>;
  findByDistance(coordinates?: ICoordinatesDTO): Promise<Job[]>;
  findByVacancies(min_vacancies: number, max_vacancies: number): Promise<Job[]>;
  filterJobs(data: IFilterJob): Promise<Job[]>;
}
