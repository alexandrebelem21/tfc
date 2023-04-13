import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'
import teamsModel from '../database/models/teamsModel';
import teamMock from './mocks/teamMock';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test router Teams', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('Return all Teams', async () => {
    sinon.stub(teamsModel, 'findAll').resolves(teamMock.allTeams);
    const result = await chai.request(app).get('/teams');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(teamMock.allTeams);
  })

  it('Return Team by Id', async () => {
    sinon.stub(teamsModel, 'findByPk').resolves(teamMock.allTeams[0]);
    const result = await chai.request(app).get('/teams/1');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(teamMock.allTeams[0]);
  })
})