import Matches from '../database/models/matchesModel';
import Teams from '../database/models/teamsModel';

export default interface ILeaderboard{
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
  team?: Teams;
  matches?: Matches[];
}
