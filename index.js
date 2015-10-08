'use strict';

var debounce = require('debounce'),
	options = {};

var leveldiv = {

	/*
		opt: options (see readme)
	*/
	set: function(opt){

		for (var prop in opt) {
			options[prop] = opt[prop];
		};

		if (!options.row) options.row = '[data-level-row]';
		if (!options.column) options.column = '[data-level-column]';

		document.onreadystatechange = function () {
			if (document.readyState === "complete") {
				leveldiv.level();
				if (options.debounce){
					window.onresize = debounce(leveldiv.resize, options.debounce);
				} else {
					window.addEventListener("resize", leveldiv.resize , true);
				}
			}
		}

	},

	resize: function(){
		leveldiv.level(true);
	},

	/*
		reset(boolean): calculate the rows again. Only used with window resize.
	*/
	level: function(reset){

		if (options.debug ) console.log('options',options);

		var rows, cols, i, c, l, a=[];

		rows = document.querySelectorAll(options.row);

		for (i = 0; i < rows.length; ++i) {

			if ( rows[i].getAttribute('data-level-row') != 'done' || reset ){ // support for lazyloading
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
						cols[c].setAttribute('data-level-column','done');
					}else{
						cols[c].style.height = '';
					}
				}
				rows[i].setAttribute('data-level-row','done');
			}
		}
	},

	refresh: function(){
		leveldiv.level();
	}

}

module.exports = leveldiv;
