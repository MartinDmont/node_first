const express = require('express')
const bodyParser = require('body-parser')
const datas = require('./datas')
const cors = require('cors')
const { Sequelize, Model, DataTypes, DatabaseError } = require('sequelize');

const sequelize = new Sequelize('api_node', 'root', 'MOT_DE_PASSE', {
    host: 'localhost',
    dialect: 'mysql'
})

class User extends Model { }
User.init({
    name: DataTypes.STRING,
    forename: DataTypes.STRING
}, { sequelize, modelName: 'User' });


const startResult = (sequelize.query("SELECT * FROM test_users"), () => {
    console.log(startResult)
})

app = express()
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));



app.use((res, req, next) => {
    console.log("[ SERVER REQUESTED ] at " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds())
    next();
})

const api = express.Router()


api.get('/shop', (req, res) => {
    res.json(datas.shops)
    console.log('requ')
})

app.get('/close', (req, res) => {
    sequelize.close()
})

//  request.header('x-forwarded-for') || request.connection.remoteAddress;

api.post('/addcomment', (req, res) => {
    (async () => {
        console.log(req.body)
        let ip =   req.connection.remoteAddress;
        console.log("sendingdatas")
        try {
            let querry = "INSERT INTO buis_comments VALUES ( \"" + ip + "\",\"" + req.body.comment + "\","+"CURRENT_DATE);"
            querry.replace("'","\'")
            let result = sequelize.query(querry)
            res.end('Bienvenue, ' + req.params.name)
        }
        catch (error) {
            console.log(error)
            res.end('Fini')
        }
    })()
})


api.get('/getcomments', (req, res) => {
    (async () => {
        let ip =   req.connection.remoteAddress;
        console.log("sendingdatas")
        try {
            let querry = "SELECT * FROM buis_comments;"
            querry.replace("'","\'")
            let result = sequelize.query(querry).then( (datas) =>{
                let to_send = JSON.parse(JSON.stringify(datas))
                console.log(typeof(to_send))
                res.json(to_send[0])
            }, (err) => {
                    res.end('Failed')
                    return
                }
            )
        }
        catch (error) {
            console.error("ERROR: ",error)
            res.end('Fini')
        }
    })()
})

api.post('/pns', (req, res) => {
    console.log('Post received', req.body)
    name = req.body['name']
    forename = req.body.forename
    console.log("Hello, " + name + ", we added this informations from you : " + name + forename)
    res.end('AC')
})

api.get('/ga', (req, res) => {
    (async () => {
        try {
            let allUsers = await sequelize.query("SELECT * FROM test_users")
            console.log(allUsers[0])
            res.send(allUsers[0])

        } catch (error) {
            let allUsers = "Not able to catch users. :'( "
            console.log('Snif, ça fonctionne pas :\n' + error)
        }

    })()
})

app.get('/', (req, res) => {
    (async (after) => {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully. :)');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    })
        ();

    res.send('CONNECTED :) <a href="/api/ga">all</a>')
})

app.post('/t', (req, res) => {
    let body = req.body
    console.log(body)
    res.json(body)
})

app.use('/api', api)

const port = 5050
app.listen(port, () => {
    let to_say = "[ SERVER STARTED ] http://localhost:" + port + "/ at " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
    console.log(to_say)
})