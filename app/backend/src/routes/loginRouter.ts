import { Router } from 'express';
import validateLogin from '../middlewares/validateLogin';
import LoginController from '../controllers/loginController';
import LoginService from '../services/loginService';
import Users from '../database/models/usersModel';
import validateToken from '../middlewares/validateToken';

const loginRouter = Router();
const loginService = new LoginService(Users);
const loginController = new LoginController(loginService);

loginRouter.post('/', validateLogin, loginController.login);
loginRouter.get('/role', validateToken, loginController.loginRole);
// teamRouter.get('/:id', teamController.getById);

export default loginRouter;
