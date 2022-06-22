
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;


 //sendFile will go here
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/document.js', function (req, res) {
    res.sendFile(path.join(__dirname, '/document.js'));
});

app.get('/main.js', function (req, res) {
    res.sendFile(path.join(__dirname, '/main.js'));
});


//app.use('/', express.static('public'));

express.static.mime.define({ 'application/javascript': ['js'] });

app.listen(port);
console.log('Server started at http://localhost:' + port);


