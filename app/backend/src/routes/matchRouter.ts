import { Router } from 'express';
import Teams from '../database/models/teamsModel';
import MatchService from '../services/matchesService';
import MatchController from '../controllers/matchesController';
import Matchs from '../database/models/matchesModel';
import validateToken from '../middlewares/validateToken';
import TeamService from '../services/teamsService';
import ValidateTeamBD from '../middlewares/validateTeamBD';

const matchRouter = Router();
const matchService = new MatchService(Matchs, Teams);
const teamService = new TeamService(Teams);
const matchController = new MatchController(matchService, teamService);

const validateTeamBD = new ValidateTeamBD(teamService);

matchRouter.get('/', matchController.getAll);
matchRouter.patch('/:id/finish', validateToken, matchController.getById);
matchRouter.patch('/:id', validateToken, matchController.updateGoals);
matchRouter.post('/', validateToken, validateTeamBD.validateTeamBD, matchController.createMatch);

export default matchRouter;
