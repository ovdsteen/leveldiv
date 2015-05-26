'use strict';

var debounce = require('debounce'),
	options = {};

var level = function(){

	if (!options.row) options.row = '[data-level-row]';
	if (!options.column) options.column = '[data-level-column]';

	if (options.debug ) console.log('options',options);

	var rows, cols, i, c, l, a=[];

	rows = document.querySelectorAll(options.row);

	for (i = 0; i < rows.length; ++i) {

		a = [];
		cols = rows[i].querySelectorAll(options.column);

		for (c = 0; c < cols.length; ++c) {
			if ( options.responsive && document.body.clientWidth > options.responsive){
				cols[c].style.height = '';
				a.push(cols[c].offsetHeight)
			}
		}

		l = Math.max.apply(Math, a);

		if (options.debug && a.length ) console.log('row '+(i+1)+' highest column is',l );

		for (c = 0; c < cols.length; ++c) {
			if ( options.responsive && document.body.clientWidth > options.responsive){
				cols[c].style.height = l+'px';
			}else{
				cols[c].style.height = '';
			}
		}
	}
}
var leveldiv = function(opt){

	if (opt.debounce) options.debounce = opt.debounce;
	if (opt.responsive) options.responsive = opt.responsive;
	if (opt.debug) options.debug = opt.debug;
	if (opt.row) options.row = opt.row;
	if (opt.column) options.column = opt.column;

	if(window.attachEvent) { //ie 9+10
		window.attachEvent('onload', level);
	} else {
		if(window.onload) {
			var curronload = window.onload;
			var newonload = function() {
				curronload();
				level();
			};
			window.onload = newonload;
		} else {
			window.onload = level();
		}
	}

	if (options.debounce){
		window.onresize = debounce(leveldiv, options.debounce);
	} else {
		window.addEventListener("resize", leveldiv , true);
	}

}

module.exports = leveldiv;
