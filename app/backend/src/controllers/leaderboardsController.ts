import { Request, Response } from 'express';
import LeaderboardsService from '../services/leaderboardsService';

export default class ControllerLearderboard {
  private _leaderboardService: LeaderboardsService;
  static getHome: [];

  constructor(private leaderboardService: LeaderboardsService) {
    this._leaderboardService = leaderboardService;
  }

  public getHome = async (_req: Request, res: Response) => {
    const isHome = 'Home';
    const result = await this._leaderboardService.allLeaderboards(isHome);
    return res.status(200).json(result);
  };

  public getAway = async (_req: Request, res: Response) => {
    const isHome = 'Away';
    const result = await this._leaderboardService.allLeaderboards(isHome);
    return res.status(200).json(result);
  };

  public getAll = async (_req: Request, res: Response) => {
    const isHome = 'All';
    const result = await this._leaderboardService.allLeaderboards(isHome);
    return res.status(200).json(result);
  };
}
