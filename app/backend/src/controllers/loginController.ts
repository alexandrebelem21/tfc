import { Request, Response } from 'express';
import { createToken } from '../auth/authToken';
// import { ILogin } from '../interfaces/ILogin';
import LoginService from '../services/loginService';

export default class LoginController {
  private _loginService: LoginService;

  constructor(loginService: LoginService) {
    this._loginService = loginService;
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await this._loginService.login({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = createToken({ email, password, role: user.role });
    return res.status(200).json({ token });
  };

  public loginRole = async (req: Request, res: Response) => {
    const user = req.body.data;
    const { role } = user.data;
    res.status(200).json({ role });
  };
}
