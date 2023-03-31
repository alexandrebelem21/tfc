import { Request, Response } from 'express';
import { createToken } from '../auth/authToken';
import { ILogin } from '../interfaces/ILogin';
import LoginService from '../services/loginService';

export default class LoginController {
  private _loginService: LoginService;

  constructor(loginService: LoginService) {
    this._loginService = loginService;
  }

  public login = async (req: Request, res: Response) => {
    const login:ILogin = req.body;
    const token = createToken(login);

    return res.status(200).json({ token });
  };
}
