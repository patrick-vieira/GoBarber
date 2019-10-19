import { Router } from 'express';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'hellos o' }));

routes.post('/users', UserController.store);

export default routes;
