const { Sequelize, Model, DataTypes, DatabaseError } = require('sequelize');

const sequelize = new Sequelize('api_node', 'root', 'LmOpf45)-G!z86', {
    host: 'localhost',
    dialect: 'mysql'
})

class Comment extends Model {}
Comment.init({
  ip: DataTypes.STRING,
  comment : DataTypes.STRING,
  date: DataTypes.DATE
}, { sequelize, modelName: 'comment-model' });


class dbAccess{
    constructor( handler = Comment ){}
    
    addComment(client_ip , client_comment){
        (async () => {
            await sequelize.sync();
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

            const jane = await Comment.create({
              ip: client_ip,
              comment : client_comment,
              date: date
            });
            return {client_ip, client_comment}
          })();
    };

    getComments(){
        return Comment.findAll()
    }
}

exports.dbAccess