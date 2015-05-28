'use strict';

var debounce = require('debounce'),
	options = {};

var leveldiv = {

	set: function(opt){

		for (var prop in opt) {
			options[prop] = opt[prop];
		};

		document.onreadystatechange = function () {
			if (document.readyState === "complete") {
				leveldiv.level();
				if (options.debounce){
					window.onresize = debounce(leveldiv.level, options.debounce);
				} else {
					window.addEventListener("resize", leveldiv.level , true);
				}
			}
		}

	},

	level: function(){

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
	},

	refresh: function(){
		leveldiv.level();
	}

}

module.exports = leveldiv;
