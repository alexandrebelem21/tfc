import { ModelStatic } from 'sequelize';
import Matches from '../database/models/matchesModel';
import Teams from '../database/models/teamsModel';

export default class MatchService {
  private _matchModel: ModelStatic<Matches>;
  private _teamModel: ModelStatic<Teams>;

  constructor(matchModel: ModelStatic<Matches>, teamModel: ModelStatic<Teams>) {
    this._matchModel = matchModel;
    this._teamModel = teamModel;
  }

  public async getAll(): Promise<Matches[]> {
    const allMatches = await this._matchModel.findAll({
      include: [
        {
          model: this._teamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: this._teamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        }],
      attributes: { exclude: ['away_team_id', 'home_team_id'] },
    });

    return allMatches;
  }

  public async getInProgress(inProgress: string): Promise<Matches[]> {
    const allMatches = await this._matchModel.findAll({
      where: { inProgress: inProgress === 'true' },
      include: [
        {
          model: this._teamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: this._teamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        }],
      attributes: { exclude: ['away_team_id', 'home_team_id'] },
    });

    return allMatches;
  }

  public async getById(id: number): Promise<void> {
    const result = await this._matchModel.findByPk(id);
    if (result) {
      (result.inProgress = false);
      await result.save();
    }
  }

  public async updateGoals(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void> {
    const result = await this._matchModel.findByPk(id);
    if (result && result.inProgress) {
      await result.update({ homeTeamGoals, awayTeamGoals });
    }
  }
}
