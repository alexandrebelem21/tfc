import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/teamsService';

export default class TeamController {
  private _teamService: TeamService;

  constructor(teamService: TeamService) {
    this._teamService = teamService;
  }

  public getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this._teamService.getAll();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    try {
      const result = await this._teamService.getById(Number(id));
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
