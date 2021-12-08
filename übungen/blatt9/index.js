const https = require('https');
const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static(__dirname + '/public'));

const options = {
	key: fs.readFileSync('./certs/localhost-key.pem'),
	cert: fs.readFileSync('./certs/localhost.pem'),
};

app.get('/', (req, res) => {
	res.render('index');
})

https.createServer(options, app)
	.listen(3000);
