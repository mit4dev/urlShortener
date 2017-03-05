var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var functions = require('./functions.js');
var bodyParser = require('body-parser');
var app = express();
var Url = require('./model/url');
mongoose.connect('mongodb://127.0.0.1:27017/test');

var hostAddress = 'http://127.0.0.1:3000/';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './', 'index.html'));
});


app.get('/:encode_id', function (req, res) {
    var base58Id = req.params.encode_id;
    var id = functions.Decode(base58Id);
    Url.findOne({_id: id}, function (err, resultUrl) {
        if (resultUrl && resultUrl.longUrl != '')
            res.redirect(resultUrl.longUrl);
        else
            res.sendFile(path.join(__dirname, './', 'index.html'));

    });
});


app.post('/api/shorten', function (req, res) {
    var long_url = req.body.url;
    var short_url = '';

    Url.findOne({longUrl: long_url}, function (err, resultUrl) {
        if (resultUrl) {
            short_url = hostAddress + functions.Encode(resultUrl._id);
            res.send({'shortUrl': short_url});
        } else {

            var newUrl = Url({
                longUrl: long_url
            });

            newUrl.save(function (err) {
                if (err)
                    console.log('error saving newUrl:' + err);

                short_url = hostAddress + functions.Encode(newUrl._id);
                res.send({'shortUrl': short_url});
            });
        }
    });
});


var server = app.listen(3000, function () {
    console.log('Server listening on port 3000');
});
