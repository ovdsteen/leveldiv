var express = require('express'),
	app = express(),
	swig = require('swig'),
	port = 5000;

app.engine('html', swig.renderFile)
	.set('view engine', 'html')
	.set('views', process.cwd() + '/views')
	.enable('strict routing')
	.use(require('serve-static')(process.cwd() + '/public'));

swig.setDefaults({cache: false});

app.get('/', function (req, res) {
	res.render('index', { });
});

var server = app.listen(port, function () {
	console.log('app listening at port', port );
});

