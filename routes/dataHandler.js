const { Sequelize, Model, DataTypes, DatabaseError } = require('sequelize');

const sequelize = new Sequelize('api_node', 'root', 'LmOpf45)-G!z86', {
  host: 'localhost',
  dialect: 'mysql',
  define :{
    timestamps: false
  }
})

class Comment extends Model { }
Comment.init({
  ip: { type : DataTypes.STRING, primaryKey : true},
  comment: DataTypes.STRING,
  date: DataTypes.DATE
}, { sequelize, modelName: 'buis_comments' });
Comment.build()



const addComment = async (client_ip, client_comment) => {
    await sequelize.sync();
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    console.log("IP : ",client_ip, ", COMMENT :", client_comment,", DATE :",date)
    const jane = await Comment.create({
      ip: client_ip,
      comment: client_comment,
      date: date
    });
    return { client_ip, client_comment }
};

const getComments = () => {
  return new Promise( (resolve, reject) => {
    let result = Comment.findAll().then( (datas) =>{
      resolve(datas)
    }, (err) => {
            res.end('Failed')
            reject(err)
        }
    )
  } )
    

}


module.exports = {addComment, getComments}