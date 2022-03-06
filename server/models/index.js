const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

//아래 설정을 통해 sequelize가 node, sql 연결 
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Post = require('./post')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize,Sequelize);

//join, user:comment=1:N join
//posts의 id를 comments의 post_id 로
db.Post.hasMany(db.Comment, {foreignKey: 'post_id', sourceKey: 'id'});
db.Comment.belongsTo(db.Post, {foreignKey: 'post_id', targetKey: 'id'});

Object.keys(db).forEach(modelName => {
if (db[modelName].associate) {
    db[modelName].associate(db);
}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;