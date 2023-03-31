import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  declare id: number;
  declare userName: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
  },
  role: {
    type: STRING,
  },
  email: {
    type: STRING,
  },
  password: {
    type: STRING,
  },
}, {
  sequelize: db,
  underscored: true,
  modelName: 'users',
  timestamps: false,
});

export default Users;
