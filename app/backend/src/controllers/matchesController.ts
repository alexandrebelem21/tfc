import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/matchesService';

export default class MatchController {
  private _matchService: MatchService;

  constructor(matchService: MatchService) {
    this._matchService = matchService;
  }

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { inProgress } = req.query;
    if (inProgress) {
      const result = await this._matchService.getInProgress(inProgress as string);
      res.status(200).json(result);
      return;
    }
    try {
      const result = await this._matchService.getAll();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    try {
      await this._matchService.getById(Number(id));
      res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };

  public updateGoals = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    try {
      await this._matchService.updateGoals(Number(id), homeTeamGoals, awayTeamGoals);
      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  };
}
