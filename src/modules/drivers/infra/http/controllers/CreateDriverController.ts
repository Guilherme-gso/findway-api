import { CreateDriverService } from '@modules/drivers/services/CreateDriverService';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { TokenProvider } from '@modules/users/providers/HashProvider/implementations/TokenProvider';
import { Request, Response } from 'express';
import { DriversRepository } from '../../typeorm/repositories/DriversRepository';

export class CreateDriverController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const driversRepository = new DriversRepository();
    const usersRepository = new UsersRepository();
    const tokenProvider = new TokenProvider();

    const { company, city, cpf, cnpj, uf, phone, user_id } = request.body;

    try {
      const createDriver = new CreateDriverService(
        driversRepository,
        usersRepository,
        tokenProvider
      );

      const { driver, user, token } = await createDriver.execute({
        company,
        cpf,
        cnpj,
        city,
        uf,
        phone,
        user_id,
      });

      return response.json({ driver, user, token });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
