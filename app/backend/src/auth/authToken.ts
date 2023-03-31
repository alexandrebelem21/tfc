import * as jwt from 'jsonwebtoken';
import { ILogin } from '../interfaces/ILogin';

const secret:string = process.env.JWT_SECRET as string;

const createToken = (data: ILogin) =>
  jwt.sign({ data }, secret, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });

const verifyToken = (token:string) => jwt.verify(token, secret);

export { createToken, verifyToken };
