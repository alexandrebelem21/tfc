import { Router } from 'express';
import TeamService from '../services/teamsService';
import TeamController from '../controllers/teamsController';
import Teams from '../database/models/teamsModel';

const teamRouter = Router();

const teamService = new TeamService(Teams);
const teamController = new TeamController(teamService);
teamRouter.get('/', teamController.getAll);

export default teamRouter;
