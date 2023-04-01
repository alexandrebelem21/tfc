import { Router } from 'express';
import Teams from '../database/models/teamsModel';
import MatchService from '../services/matchesService';
import MatchController from '../controllers/matchesController';
import Matchs from '../database/models/matchesModel';

const matchRouter = Router();
const matchService = new MatchService(Matchs, Teams);
const matchController = new MatchController(matchService);

matchRouter.get('/', matchController.getAll);

export default matchRouter;
