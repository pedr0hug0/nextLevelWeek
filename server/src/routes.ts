import express, { request, response } from 'express';

import PointsControllers from './controllers/PointsControllers';
const pointsControllers = new PointsControllers();

import ItemsControllers from './controllers/itemsControllers';
const itemControles = new ItemsControllers();

const routes = express.Router();




//listar items (icones)
routes.get('/items', itemControles.index);
// index(listar), show, create, update, destroy

//inserindo pontos de coleta
routes.post('/points', pointsControllers.create);
//listar pontos por id (request param)
//routes.get('/points/:id', pointsControllers.byId);

export default routes;

// Service Pattern
// Repository Patterns ( Data Mapper )