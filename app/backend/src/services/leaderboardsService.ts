import { ModelStatic } from 'sequelize';
import Matches from '../database/models/matchesModel';
import Teams from '../database/models/teamsModel';
import Leaderboards from '../database/models/leaderboardsModel';
import ILeaderboard from '../interfaces/ILeaderboard';
import leaderboardSort from '../utils/leaderboardSort';

export default class Leaders {
  private _matchesModel: ModelStatic<Matches>;
  private _teamModel: ModelStatic<Teams>;

  constructor(teamModel: ModelStatic<Teams>, matchesModel: ModelStatic<Matches>) {
    this._teamModel = teamModel;
    this._matchesModel = matchesModel;
  }

  public async allLeaderboards(): Promise<ILeaderboard[]> {
    const teams = await this._teamModel.findAll();
    const matches = await this._matchesModel.findAll({ where: { inProgress: false } });
    const leaderboards = teams.map((teamId) => new Leaderboards(teamId, matches));
    const sortedTeams = leaderboardSort(leaderboards);

    return sortedTeams.map((team) => ({
      name: team.name,
      totalPoints: team.totalPoints,
      totalGames: team.totalGames,
      totalVictories: team.totalVictories,
      totalDraws: team.totalDraws,
      totalLosses: team.totalLosses,
      goalsFavor: team.goalsFavor,
      goalsOwn: team.goalsOwn,
      goalsBalance: team.goalsBalance,
      efficiency: team.efficiency,
    }));
  }
}
