const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.use( (req,res, next) => {
    next()
} )

app.get('/', (req,res) => {
    res.send('coucou :)')
})

app.post('/p', (req,res) => {
    console.log(req.body)
    console.log(req.body.name)
    res.send('received sir !')
})

app.listen(5000, () => {
    console.log('Server stated on port 5000')
})