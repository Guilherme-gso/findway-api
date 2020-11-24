import { ICoordinatesDTO } from '@modules/jobs/dtos/ICoordinatesDTO';
import { ICreateJobDTO } from '@modules/jobs/dtos/ICreateJobDTO';
import {
  IFilterJob,
  IJobsRepository,
} from '@modules/jobs/repositories/IJobsRepository';
import { getDistanceFromLatLonInKmnumber } from '@modules/jobs/utils/calculateDistance';
import { getRepository } from 'typeorm';
import { Job } from '../entities/Job';

export class JobsRepository implements IJobsRepository {
  constructor(private jobsRepository = getRepository(Job)) {}

  public async create(data: ICreateJobDTO): Promise<Job> {
    const job = this.jobsRepository.create(data);

    await this.jobsRepository.save(job);

    return job;
  }

  public async findAllJobs(): Promise<Job[]> {
    const jobs = await this.jobsRepository.find();

    return jobs;
  }

  public async findById(id: string): Promise<Job | undefined> {
    const job = await this.jobsRepository.findOne({ where: { id } });

    return job;
  }

  public async findByTitle(title: string): Promise<Job | undefined> {
    const job = await this.jobsRepository
      .createQueryBuilder()
      .where('LOWER(title) = LOWER(:title)', { title })
      .getOne();

    return job;
  }

  public async findByCategories(categories: string[] | string): Promise<Job[]> {
    const jobs = await this.jobsRepository.find();
    const availableJobs: Job[] = [];

    if (typeof categories === 'string')
      return jobs.filter(job => job.categories.includes(categories));

    categories.forEach(category => {
      const job = jobs.find(findJob => findJob.categories.includes(category));

      if (job) availableJobs.push(job);
    });

    return availableJobs;
  }

  public async findByDistance(coordinates?: ICoordinatesDTO): Promise<Job[]> {
    const jobs = await this.jobsRepository.find();

    if (coordinates) {
      let nextJobs = jobs.map(job => {
        const distance = getDistanceFromLatLonInKmnumber(coordinates, {
          latitude: Number(job.latitude),
          longitude: Number(job.longitude),
        });

        return {
          distance,
          ...job,
        };
      });

      nextJobs = nextJobs.sort((a, b) => {
        return a.distance > b.distance ? 1 : -1;
      });

      return nextJobs;
    }

    return jobs;
  }

  public async findByVacancies(
    vacanciesMin: number,
    vacanciesMax: number
  ): Promise<Job[]> {
    const jobs = await this.jobsRepository
      .createQueryBuilder('jobs')
      .where('jobs.vacancies >= (:min)', { min: vacanciesMin })
      .andWhere('jobs.vacancies <= (:max)', { max: vacanciesMax })
      .getMany();

    return jobs;
  }

  public async filterJobs({
    categories,
    min_vacancies,
    max_vacancies,
  }: IFilterJob): Promise<Job[]> {
    if (categories && min_vacancies && max_vacancies) {
      const jobsByCategories = await this.findByCategories(categories);

      return jobsByCategories.filter(
        job => job.vacancies >= min_vacancies && job.vacancies <= max_vacancies
      );
    }

    if (categories) {
      const jobs = await this.findByCategories(categories);
      return jobs;
    }

    if (min_vacancies && max_vacancies) {
      const jobs = await this.findByVacancies(min_vacancies, max_vacancies);
      return jobs;
    }

    const jobs = await this.jobsRepository.find();

    return jobs;
  }
}
