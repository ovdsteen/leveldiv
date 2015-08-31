var leveldiv = require('leveldiv'),
	request = require('superagent');

leveldiv.set( {
	debounce: 300,
	responsive: 500,
	debug: true,
	row: '[data-level-row]',
	column: '[data-level-column]'
});

document.getElementById("refresh").addEventListener("click", function( event ) {

	event.preventDefault();

	var cols = document.querySelectorAll('[data-level-column]');

	for (c = 0; c < cols.length; ++c) {
		cols[c].style.height = '';
	}
	setTimeout(function(){
		leveldiv.refresh();
	}, 500);

}, false);

document.getElementById("row").addEventListener("click", function( event ) {

	event.preventDefault();

	request
		.get('/row')
		.end(function(err, res){
			if (!err){
				var main = document.querySelector('main');
				main.innerHTML = res.text+' '+main.innerHTML;
				setTimeout(function(){
					leveldiv.refresh();
				}, 1000);
			}
		});

}, false);
