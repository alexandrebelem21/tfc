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

    const user = await this._loginService.login(login);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({ token });
  };
}
