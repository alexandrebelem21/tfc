import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/teamsService';

export default class validateTeamBD {
  private _teamService: TeamService;

  constructor(teamService: TeamService) {
    this._teamService = teamService;
  }

  public validateTeamBD = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeamId, awayTeamId } = req.body;
    try {
      if (homeTeamId === awayTeamId) {
        res.status(422)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }
      const homeTeam = await this._teamService.getById(homeTeamId);
      const awayTeam = await this._teamService.getById(awayTeamId);
      if (!homeTeam || !awayTeam) {
        res.status(404).json({ message: 'There is no team with such id!' });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
