import { Router } from 'express';
import Matches from '../database/models/matchesModel';
import LeaderboardService from '../services/leaderboardsService';
import LeaderboardController from '../controllers/leaderboardsController';
import Teams from '../database/models/teamsModel';

const router = Router();

const leaderboardService = new LeaderboardService(Teams, Matches);
const leaderboardController = new LeaderboardController(leaderboardService);

router.get('/home', leaderboardController.getHome);

export default router;
