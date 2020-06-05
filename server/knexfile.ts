import path from 'path'; //organiza de acordo com o SO mudando /, \, //


module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
    },
    migrations: { 
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: { 
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true, 
};

//após, rodar: 
//npx knex --knexfile knexfile.ts migrate:latest
//adicionar variavel no package.json com a string para facilitar: "knex --knexfile knexfile.ts migrate:latest"
//npm run knex.migrate
//^ comando para criar as tabelas

//instalar plugin vscode: sqlite para poder abrir .sqlite
//ctrl+shift+p
//sqlite open dabase
//adicionou sqlite explorer na navegação lateral.


    