import ILeaderboard from '../../interfaces/ILeaderboard';
import Matches from './matchesModel';
import Teams from './teamsModel';

export default class LeaderboardsAway implements ILeaderboard {
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

  constructor(team: Teams, matches: Matches[]) {
    this.team = team;
    this.matches = matches;
    this.name = team.teamName;
    this.totalGames = this.TotalGames();
    this.totalVictories = this.TotalVictories();
    this.totalDraws = this.TotalDraws();
    this.totalPoints = (this.totalVictories * 3) + this.totalDraws;
    this.totalLosses = this.TotalLosses();
    this.goalsFavor = this.GoalsFavor();
    this.goalsOwn = this.GoalsOwn();
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.efficiency = parseFloat(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
  }

  public TotalGames() {
    if (!this.matches) {
      return 0;
    }
    return this.matches.reduce((total, el) => {
      if (this.team?.id === el.awayTeamId && el.inProgress === false) {
        return total + 1;
      }
      return total;
    }, 0);
  }

  public TotalVictories() {
    if (!this.matches) {
      return 0;
    }
    return this.matches.reduce((total, el) => {
      if (this.team?.id === el.awayTeamId && el.homeTeamGoals < el.awayTeamGoals) {
        return total + 1;
      }
      return total;
    }, 0);
  }

  public TotalDraws() {
    if (!this.matches) {
      return 0;
    }
    return this.matches.reduce((total, el) => {
      if (this.team?.id === el.awayTeamId && el.homeTeamGoals === el.awayTeamGoals) {
        return total + 1;
      }
      return total;
    }, 0);
  }

  public TotalLosses() {
    if (!this.matches) {
      return 0;
    }
    return this.matches.reduce((total, el) => {
      if (this.team?.id === el.awayTeamId && el.homeTeamGoals > el.awayTeamGoals) {
        return total + 1;
      }
      return total;
    }, 0);
  }

  public GoalsFavor() {
    if (!this.matches) {
      return 0;
    }
    return this.matches.reduce((total, el) => {
      if (this.team?.id === el.awayTeamId && el.inProgress === false) {
        return total + el.awayTeamGoals;
      }
      return total;
    }, 0);
  }

  public GoalsOwn() {
    if (!this.matches) {
      return 0;
    }
    return this.matches.reduce((total, el) => {
      if (this.team?.id === el.awayTeamId && el.inProgress === false) {
        return total + el.homeTeamGoals;
      }
      return total;
    }, 0);
  }
}
