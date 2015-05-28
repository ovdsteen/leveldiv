var leveldiv = require('leveldiv');

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
