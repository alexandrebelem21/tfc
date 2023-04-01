import { Request, Response, NextFunction } from 'express';

const isValidEmail = (email: string) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!isValidEmail(email) || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
};

export default validateLogin;
