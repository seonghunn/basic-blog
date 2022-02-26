const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

//아래 설정을 통해 sequelize가 node, sql 연결 
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Post = require('./post')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
if (db[modelName].associate) {
    db[modelName].associate(db);
}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;