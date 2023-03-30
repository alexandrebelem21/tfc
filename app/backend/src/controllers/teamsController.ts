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

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    try {
      const result = await this.teamService.getById(Number(id));
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
