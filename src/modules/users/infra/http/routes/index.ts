import { Router } from 'express';
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';
import { UsersController } from '../controllers/UsersController';
import { ProfileController } from '../controllers/ProfileController';

const usersRouter = Router();
const usersController = new UsersController();
const authenticateUserController = new AuthenticateUserController();
const profileController = new ProfileController();

usersRouter.post('/', usersController.create);
usersRouter.patch('/:user_id/avatar', usersController.update);
usersRouter.put('/:user_id/profile', profileController.update);
usersRouter.post('/sessions', authenticateUserController.handle);

export { usersRouter };
