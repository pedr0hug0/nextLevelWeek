import { Request, Response} from 'express';
import knex from '../database/connection';

class PointsController{

    //listar todos
    
    async index (request: Request, response: Response) {
        //cidade, uf, items (Query Params)
        const { city, uf, items } = request.query;

        console.log(city, uf, items);
        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));//removendo espaços em brancos e retornar tipo numero
        
        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.items_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return response.json({ points });
        
    }


    //showById
    async show (request: Request, response: Response) {
        //const id = request.params.id;
        const {id} = request.params;

        const point = await knex('points').where('id', id).first(); //id = id parametro. Trazer o primeiro(unico registro, remove array).

        if (!point) { //não encontrou
            return response.status(400).json({ message: 'Point not found'} );
        }

        /**
         * SELECT * FROM items
         *  JOIN point_items ON items.id = point_items.item_id
         * WHERE point_items.point_id = {id}
         */
        const items = await knex('items')
            .join('point_items', 'items.id', "=", 'point_items.items_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return response.json( { point, items} );//retorna o point.
        
    }

    //create
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
            image: 'https://images.unsplash.com/photo-1580913428023-02c695666d61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60-fake',
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

        //tudo ok? dar commit
        trx.commit();
    
        return response.json({
            id: point_id, //+id
            ... point,//todos objetos do point
        });
     
    }
    //fim create


}

export default PointsController;