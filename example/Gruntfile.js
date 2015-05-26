'use strict';

var fs = require('fs');

module.exports = function(grunt){

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var config = {

		mkdir: {
			dev: {
				options: {
					create: ['public/css', 'public/js']
				}
			}
		},

		symlink: {
			options: {
				overwrite: false
			},
			dev: {
				files: [
					{
						src: '../', dest: './node_modules/leveldiv'
					},
				]
			}
		},

		concurrent: {
			dev: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},

		sass: {
			dev: {
				files: {
					'./public/css/index.css': './src/style/index.scss'
				}
			}
		},

		browserify: {
			dev: {
				files: {
					'./public/js/index.js': './src/script/index.js'
				}
			}
		},

		nodemon: {
			dev: {}
		},

		watch: {
			options: {
				nospawn: true,
				livereload: true
			},
			script: {
				files: ['../index.js', 'src/script/*.js', 'src/script/**/*.js'],
				tasks: ['browserify']
			},
			style: {
				files: ['src/style/*.scss', 'src/style/**/*.scss'],
				tasks: ['sass']
			}
		}
	};

	grunt.initConfig(config);

	grunt.registerTask('default', [
		'build',
		'concurrent'
	]);
	grunt.registerTask('build', [
		'mkdir',
		'symlink',
		'browserify',
		'sass'
	]);
};
