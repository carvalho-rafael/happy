import { Router } from 'express';

import multer from 'multer';
import uploadConfig from './config/upload'
import AuthController from './controllers/AuthController';

import OrphanagesController from './controllers/OrphanagesController'
import UserController from './controllers/UserController';

import authMiddleware from './middleware/authMiddleware'

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/singup', UserController.store);
routes.post('/login', AuthController.authenticate);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', authMiddleware, upload.array('images'), OrphanagesController.create);

export default routes;