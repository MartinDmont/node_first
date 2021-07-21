const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const api = require('./routes/api')

app = express()
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));



app.use((res, req, next) => {
    console.log("[ SERVER REQUESTED ] at " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds())
    next();
})

app.get('/close', (req, res) => {
    sequelize.close()
})


app.get('/', (req, res) => {

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