import { ModelStatic } from 'sequelize';
import Teams from '../database/models/teamsModel';

export default class TeamService {
  private teamModel: ModelStatic<Teams>;
  constructor(model: ModelStatic<Teams>) {
    this.teamModel = model;
  }

  public async getAll(): Promise<Teams[]> {
    const result = await this.teamModel.findAll();
    return result;
  }
}
