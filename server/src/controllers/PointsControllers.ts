import { Request, Response} from 'express';
import knex from '../database/connection';

class PointsController{


    async create (request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
        //mesma coisa que:
        //const name = request.body.name;
    
        //** iniciar uma transaction */
        const trx = await knex.transaction();
    

        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };
        //const insertedIds = await knex('points').insert({
        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items.map((items_id: number) => {
            return {
                items_id,
                point_id,
            };
        })
    
        //await knex('point_items').insert(pointItems);
        await trx('point_items').insert(pointItems);
    
        return response.json({
            id: point_id, //+id
            ... point,//todos objetos do point
        });
     
    }
}

export default PointsController;