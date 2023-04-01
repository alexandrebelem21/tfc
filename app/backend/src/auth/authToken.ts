import * as jwt from 'jsonwebtoken';
import { ILogin } from '../interfaces/ILogin';

interface IUser extends ILogin {
  role: string;
}

const secret:string = process.env.JWT_SECRET || 'secret';

const createToken = (data: IUser) => {
  const token = jwt.sign({ data }, secret, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });
  return token;
};

const verifyToken = (token:string) => jwt.verify(token, secret);

export { createToken, verifyToken };
