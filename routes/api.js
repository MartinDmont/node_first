const api = require('express').Router()
const dbAccess = require('./dataHandler')
const datas = require('./instance/datas')


api.post('/addcomment', (req, res) => {
    console.log(req.body)
    let ip = req.connection.remoteAddress;
    console.log("sendingdatas")
    try {
        dbAccess.addComment(ip, req.body.comment)
        res.end('Bienvenue, ' + req.params.name)
    }
    catch (error) {
        console.log(error)
        res.end('Fini')
    }
})


api.get('/getcomments', (req, res) => {
    let ip = req.connection.remoteAddress;
    console.log("sendingdatas")
    try {
        dbAccess.getComments().then(
            result => {
                let to_send = JSON.parse(JSON.stringify(result))
                res.status(200).json(to_send)
            }
        ).catch(err => console.log(err))

    }
    catch (error) {
        console.error("ERROR: ", error)
        res.end('Fini')
    }
})

api.get('/shop', (req, res) => {
    res.json(datas.shops)
    console.log('requ')
})


module.exports = api