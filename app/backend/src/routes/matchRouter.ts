import { Router } from 'express';
import Teams from '../database/models/teamsModel';
import MatchService from '../services/matchesService';
import MatchController from '../controllers/matchesController';
import Matchs from '../database/models/matchesModel';
import validateToken from '../middlewares/validateToken';

const matchRouter = Router();
const matchService = new MatchService(Matchs, Teams);
const matchController = new MatchController(matchService);

matchRouter.get('/', matchController.getAll);
matchRouter.patch('/:id/finish', validateToken, matchController.getById);
matchRouter.patch('/:id', validateToken, matchController.updateGoals);
matchRouter.post('/', validateToken, matchController.createMatch);

export default matchRouter;
