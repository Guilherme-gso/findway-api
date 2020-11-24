import { ListAllDriversService } from '@modules/drivers/services/ListAllDriversService';
import { ListDriverByIdService } from '@modules/drivers/services/ListDriverByIdService';
import { Request, Response } from 'express';
import { DriversRepository } from '../../typeorm/repositories/DriversRepository';

export class ListDriversController {
  public async index(request: Request, response: Response): Promise<Response> {
    const driversRepository = new DriversRepository();
    const { id } = request.user;

    try {
      const listDrivers = new ListAllDriversService(driversRepository);
      const drivers = await listDrivers.execute(id);

      return response.json(drivers);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const driversRepository = new DriversRepository();
    const { driver_id } = request.params;

    try {
      const listDriverById = new ListDriverByIdService(driversRepository);

      const driver = await listDriverById.execute({
        driver_id,
      });

      return response.json(driver);
    } catch (error) {
      return response.status(400).json({ error: error.name });
    }
  }
}
