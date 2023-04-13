import ILeaderboard from '../interfaces/ILeaderboard';

export default function sortLeaderboard(leaderboard: ILeaderboard[]): ILeaderboard[] {
  function byGoals(teamA: ILeaderboard, teamB: ILeaderboard) {
    if (teamA.goalsBalance === teamB.goalsBalance) {
      return teamB.goalsFavor - teamA.goalsFavor;
    }
    return teamB.goalsBalance - teamA.goalsBalance;
  }
  function byVictories(teamA: ILeaderboard, teamB: ILeaderboard) {
    if (teamA.totalVictories === teamB.totalVictories) {
      return byGoals(teamA, teamB);
    }
    return teamB.totalVictories - teamA.totalVictories;
  }

  function byPoints(teamA: ILeaderboard, teamB: ILeaderboard) {
    if (teamA.totalPoints === teamB.totalPoints) { return byVictories(teamA, teamB); }
    return teamB.totalPoints - teamA.totalPoints;
  }
  return leaderboard.sort(byPoints);
}
