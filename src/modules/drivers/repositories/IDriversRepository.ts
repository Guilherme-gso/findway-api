import { ICreateDriverDTO } from '../dtos/ICreateDriverDTO';
import { Driver } from '../infra/typeorm/entities/Driver';

export interface IDriverRequest {
  user_id: string;
}

export interface IDriverExceptRequest {
  except_user_id: string;
}

export interface IDriversRepository {
  create(data: ICreateDriverDTO): Promise<Driver>;
  findDriverId(user_id: string): Promise<Driver | undefined>;
  findById(id: string): Promise<Driver | undefined>;
  findDriverJobs(user_id: string): Promise<Driver | undefined>;
  findDriverWithTheSameUserId({
    user_id,
  }: IDriverRequest): Promise<Driver | undefined>;
  listDrivers({ except_user_id }: IDriverExceptRequest): Promise<Driver[]>;
}
