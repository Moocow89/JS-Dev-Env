/*global import export */
import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';


const port = process.env.PORT;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));

});

app.get('/users', function(req, res) {
    res.json([{
        "id": 1,
        "firstName": "Bob",
        "LastName": "Smith",
        "email": "bob@gmail.com"
    }, {
        "id": 2,
        "firstName": "Brian",
        "LastName": "Ryan",
        "email": "brian@gmail.com"
    }, {
        "id": 3,
        "firstName": "Tina",
        "LastName": "Lee",
        "email": "tina@gmail.com"
    }]);
});

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    }
    else {
        open('http://localhost:' + port);
    }
});
