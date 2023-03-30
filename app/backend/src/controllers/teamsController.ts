import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/teamsService';

export default class TeamController {
  constructor(private teamService: TeamService) { }

  public getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.teamService.getAll();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
