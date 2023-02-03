const DEFAULT_PORT = 80;

let express = require('express'),
    app = express();

app.use(express.static(__dirname + '/client'));

app.set('port', process.env.PORT || DEFAULT_PORT);

app.get('/' , (req,res,next) => {
    res.sendFile(__dirname + '/views/index.html');
});

let http = require('http'),
    fs = require('fs');

http.createServer({ }, app).listen(app.get('port'));
console.log("Server listening for http connections on port ", app.get('port'));