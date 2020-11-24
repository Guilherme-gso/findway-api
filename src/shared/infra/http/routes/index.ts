import { driversRouter } from '@modules/drivers/infra/http/routes';
import { jobsRouter } from '@modules/jobs/infra/http/routes';
import { categoriesRouter } from '@modules/jobs/infra/http/routes/categories.routes';
import { filterRouter } from '@modules/jobs/infra/http/routes/filters.routes';
import { nextRouter } from '@modules/jobs/infra/http/routes/next.routes';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { usersRouter } from '@modules/users/infra/http/routes';
import { Router } from 'express';

const appRouter = Router();

appRouter.use('/users', usersRouter);
appRouter.use('/drivers', driversRouter);
appRouter.use('/jobs', ensureAuthenticated, jobsRouter);
appRouter.use('/categories/jobs', ensureAuthenticated, categoriesRouter);
appRouter.use('/next/jobs', ensureAuthenticated, nextRouter);
appRouter.use('/filter/jobs', ensureAuthenticated, filterRouter);

export { appRouter };
