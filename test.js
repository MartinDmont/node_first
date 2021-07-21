//Import the necessary libraries/declare the necessary objects
var express = require("express");
var myParser = require("body-parser");
var app = express();


app.use(express.json())
app.use(myParser.urlencoded({extended : true}));
app.post("/yourpath", function(request, response) {
    console.log(request.body); //This prints the JSON document received (if it is a JSON document)
    response.end('eh meeeeerde')
});

app.get("/", (req,res) => {
    res.end('HELOOOOOOOHOOO')
})

app.listen(8080);