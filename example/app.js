var express = require('express'),
	app = express(),
	swig = require('swig'),
	loremipsum = require('lorem-ipsum'),
	port = 5000;

app.engine('html', swig.renderFile)
	.set('view engine', 'html')
	.set('views', process.cwd() + '/views')
	.enable('strict routing')
	.use(require('serve-static')(process.cwd() + '/public'));

swig.setDefaults({cache: false});

var helper = {
	random: function(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	columns: function(){
		var cols = [];
		for (var i = 0; i < 3; i++) {
			cols.push( loremipsum({
				count: helper.random(1,10)
			}));
		};
		return cols;
	}
}

app.get('/', function (req, res) {
	res.render('index', {
		cols: helper.columns()
	});
});

app.get('/row', function (req, res) {
	res.render('partials/row.html', {
		cols: helper.columns()
	});
});

var server = app.listen(port, function () {
	console.log('app listening at port', port );
});

