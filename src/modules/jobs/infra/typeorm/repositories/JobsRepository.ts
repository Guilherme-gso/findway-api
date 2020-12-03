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

  public async save(data: Job): Promise<Job> {
    const job = await this.jobsRepository.save(data);

    return job;
  }

  public async delete(data: Job): Promise<void> {
    await this.jobsRepository
      .createQueryBuilder('jobs')
      .where('jobs.id = :id', { id: data.id })
      .delete()
      .execute();
  }

  public async findAllJobs(): Promise<Job[]> {
    const jobs = await this.jobsRepository.find({
      order: {
        title: 1,
      },
    });

    return jobs;
  }

  public async findDriverJobs(driver_id: string): Promise<Job[]> {
    const jobs = await this.jobsRepository.find({
      where: {
        driver_id,
      },
    });

    return jobs;
  }

  public async findById(id: string): Promise<Job | undefined> {
    const job = await this.jobsRepository.findOne({
      where: {
        id,
      },
      relations: ['driver'],
    });

    return job;
  }

  public async findByTitle(title: string): Promise<Job[]> {
    const job = await this.jobsRepository
      .createQueryBuilder('jobs')
      .where('LOWER(jobs.title) LIKE :title', {
        title: `${title.toLowerCase()}%`,
      })
      .getMany();

    return job;
  }

  public async findByCategories(categories: string[]): Promise<Job[]> {
    const jobs = await this.jobsRepository.find();
    let availableJobs: Job[] = [];

    categories.forEach(category => {
      const job = jobs.filter(findJob => findJob.categories.includes(category));

      availableJobs = job;
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
    if (categories.length && min_vacancies && max_vacancies) {
      const jobsByCategories = await this.findByCategories(categories);

      return jobsByCategories.filter(
        job => job.vacancies >= min_vacancies && job.vacancies <= max_vacancies
      );
    }

    if (categories && !max_vacancies && !min_vacancies) {
      const jobs = await this.findByCategories(categories);
      return jobs;
    }

    if (min_vacancies && max_vacancies && !categories.length) {
      const jobs = await this.findByVacancies(min_vacancies, max_vacancies);
      return jobs;
    }

    const jobs = await this.jobsRepository.find();

    return jobs;
  }
}
