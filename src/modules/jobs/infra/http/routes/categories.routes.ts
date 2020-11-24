import { Router } from 'express';
import { ListJobsByCategoriesController } from '../controllers/ListJobsByCategoriesController';

const categoriesRouter = Router();

const listJobsByCategoryController = new ListJobsByCategoriesController();

categoriesRouter.get('/', listJobsByCategoryController.index);

export { categoriesRouter };
