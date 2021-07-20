const express = require('express')
const bodyParser = require('body-parser')
const datas = require('./datas')
const cors = require('cors')
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('api_node', 'root', 'LmOpf45)-G!z86', {
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
app.use(bodyParser.json())


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

api.get('/a/:name/:forename', (req, res) => {
    (async () => {
        console.log("sendingdatas")
        try {
            let querry = "INSERT INTO test_users VALUES ( '" + req.params.name + "','" + req.params.forename + "');"
            let result = sequelize.query(querry)
            res.end('Bienvenue, ' + req.params.name)
        }
        catch (error) {
            console.log(error)
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

app.post('/t', bodyParser.json(), (req, res) => {
    let body = req.body.name
    console.log(body)
    res.json(body)
})

app.use('/api', api)

const port = 5050
app.listen(port, () => {
    let to_say = "[ SERVER STARTED ] http://localhost:" + port + "/ at " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
    console.log(to_say)
})