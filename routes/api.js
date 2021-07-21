const api = require('express').Router()
const dbAccess  = require('./dataHandler').dbAccess
const datas = require('./instance/datas')

console.log("dbassecc : ",dbAccess)
const dbAccesser = new dbAccess


api.post('/addcomment',   (req, res) => {
    console.log(req.body)
    let ip =   req.connection.remoteAddress;
    console.log("sendingdatas")
    try {
        dbAccesser.addComment(ip, req.body.comment)
        res.end('Bienvenue, ' + req.params.name)
    }
    catch (error) {
        console.log(error)
        res.end('Fini')
    }
})


api.get('/getcomments', (req, res) => {
    let ip =   req.connection.remoteAddress;
    console.log("sendingdatas")
    try {
        console.log(typeof(dbAccess))
        let result = dbAccesser.getComments()
        let to_send = JSON.parse(JSON.stringify(result))
        res.status(200).json(to_send)
    }
    catch (error) {
        console.error("ERROR: ",error)
        res.end('Fini')
    }
})

api.get('/shop', (req, res) => {
    res.json(datas.shops)
    console.log('requ')
})


module.exports = api