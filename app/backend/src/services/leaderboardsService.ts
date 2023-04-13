import { ModelStatic } from 'sequelize';
import Matches from '../database/models/matchesModel';
import Teams from '../database/models/teamsModel';
import LeaderboardsHome from '../database/models/leaderboardsHomeModel';
import ILeaderboard from '../interfaces/ILeaderboard';
import leaderboardSort from '../utils/leaderboardSort';
import LeaderboardsAway from '../database/models/leaderboardsAwayModel';
import Leaderboards from '../database/models/leaderboardsModel';

export default class Leaders {
  private _matchesModel: ModelStatic<Matches>;
  private _teamModel: ModelStatic<Teams>;

  constructor(teamModel: ModelStatic<Teams>, matchesModel: ModelStatic<Matches>) {
    this._teamModel = teamModel;
    this._matchesModel = matchesModel;
  }

  public async allLeaderboards(isHome: string): Promise<ILeaderboard[]> {
    const teams = await this._teamModel.findAll();
    const matches = await this._matchesModel.findAll({ where: { inProgress: false } });
    const leaderboards = teams.map((teamId) => {
      if (isHome === 'Home') {
        return new LeaderboardsHome(teamId, matches);
      } if (isHome === 'Away') {
        return new LeaderboardsAway(teamId, matches);
      }
      return new Leaderboards(teamId, matches);
    });

    const leaderboardData = leaderboards.map(Leaders.getLeaderboardData);
    return leaderboardSort(leaderboardData);
  }

  public static getLeaderboardData(team: LeaderboardsHome
  | LeaderboardsAway | Leaderboards): ILeaderboard {
    return {
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
    };
  }
}
