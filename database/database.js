const Sequelize = require('sequelize');

const connection = new Sequelize(
    'figurinhas', // nome do banco
    'root', // usuário de conexão
    'root', // senha do banco
    {
        host: 'localhost', // url do servidor
        dialect: 'mysql', // tipo do banco
        timezone: '-03:00' // GMT -3 - Brasil
    }
);

module.exports = connection;