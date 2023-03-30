import { ModelStatic } from 'sequelize';
import Teams from '../database/models/teamsModel';

export default class TeamService {
  private _teamModel: ModelStatic<Teams>;

  constructor(teamModel: ModelStatic<Teams>) {
    this._teamModel = teamModel;
  }

  public async getAll(): Promise<Teams[]> {
    const result = await this._teamModel.findAll();
    return result;
  }

  public async getById(id: number): Promise<Teams | null> {
    const result = await this._teamModel.findByPk(id);
    return result;
  }
}
