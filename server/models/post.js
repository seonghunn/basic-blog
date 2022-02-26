module.exports = (sequelize, DataTypes)=>{
    const Post = sequelize.define('Post', {
        // id: {},
        writer: {
            type:DataTypes.STRING(50), 
            allowNull: false, 
        },
        title: {
            type:DataTypes.STRING(50),
            allowNull: false,
        },
        content: {
            type:DataTypes.STRING(1000),
            allowNull: false,
        },
        hit:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0
        }
    },{
        // 한글,이모티콘
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        paranoid: true,
    });
    Post.associate = (db) => {};
    return Post;
}