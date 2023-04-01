import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import Users from '../database/models/usersModel';
import { ILogin } from '../interfaces/ILogin';

interface IUser extends ILogin {
  role: string;
}

export default class LoginService {
  private _userModel: ModelStatic<Users>;

  constructor(userModel: ModelStatic<Users>) {
    this._userModel = userModel;
  }

  public async login(login: ILogin): Promise<IUser | null> {
    const { email, password } = login;
    const result = await this._userModel.findOne({
      where: { email },
    });
    if (!result) {
      return null;
    }
    const passEqual = await bcrypt.compare(password, result.password);
    if (!passEqual) {
      return null;
    }
    return result;
  }
}
