import knex from 'knex';
import path from 'path'; //organiza de acordo com o SO mudando /, \, //

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
    }, 
    useNullAsDefault: true,
});
//N para N sempre gera uma tabela_relacionamento
export default connection;

