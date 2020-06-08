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
/**
    {
    "name": "Mercado Sete Center",
    "email": "sete_cesnter@law.com.br",
    "whatsapp": "134574654",
    "latitude": "-45.121212",
    "longitude": "-56.424242" ,
    "city": "Fernandópolis",
    "uf": "SP",
    "items": [
        1,
        2,
        6
    ]
    }
 */

//listar todos os pontos
routes.get('/points', pointsControllers.index);
//http://localhost:3333/points/8


 //listar pontos por id (request param)
routes.get('/points/:id', pointsControllers.show);
//http://localhost:3333/points/8


export default routes;

// Service Pattern
// Repository Patterns ( Data Mapper )