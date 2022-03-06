module.exports = (sequelize, DataTypes)=>{
    const Comment = sequelize.define('Comment', {
        // id: {},
        commenter: {
            type:DataTypes.STRING(50), 
            allowNull: false, 
        },
        comment: {
            type:DataTypes.STRING(1000),
            allowNull: false,
        },
    },{
        // 한글,이모티콘
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        paranoid: true,
    });
    Comment.associate = (db) => {};
    return Comment;
}