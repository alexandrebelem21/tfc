import { Router } from 'express';
import validateLogin from '../middlewares/validateLogin';
import LoginController from '../controllers/loginController';
import LoginService from '../services/loginService';
import Users from '../database/models/usersModel';

const loginRouter = Router();
const loginService = new LoginService(Users);
const loginController = new LoginController(loginService);

loginRouter.post('/', validateLogin, loginController.login);
// teamRouter.get('/:id', teamController.getById);

export default loginRouter;
