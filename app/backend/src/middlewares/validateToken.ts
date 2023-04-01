import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth/authToken';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const tokenOk = verifyToken(authorization);
    req.body.data = tokenOk;
    next();
  } catch {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
