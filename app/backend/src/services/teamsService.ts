import { ModelStatic } from 'sequelize';
import ITeam from '../interfaces/ITeam';
import Teams from '../database/models/teamsModel';

export default class TeamService {
  private _teamModel: ModelStatic<Teams>;

  constructor(teamModel: ModelStatic<Teams>) {
    this._teamModel = teamModel;
  }

  public async getAll(): Promise<ITeam[]> {
    const result = await this._teamModel.findAll();
    return result;
  }

  public async getById(id: number): Promise<ITeam | null> {
    const result = await this._teamModel.findByPk(id);
    return result;
  }
}
