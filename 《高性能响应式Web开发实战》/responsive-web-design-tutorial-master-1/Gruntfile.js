module.exports = function(grunt) {
    grunt.initConfig({
		cssmin: {
			target: {
				files: {
					'./site/dist/css/style.min.css': 
					[
						'./site/src/css/normalize.css', 
						'./site/src/css/reset.css', 
						'./site/src/css/common.css',
						'./site/src/css/nav.css',
						'./site/src/css/header.css',
						'./site/src/css/article.css'
					]
				}
			}
		},
		copy: {
		  	main: {
				files: [
					{
						expand: true, 
						src: ['./site/src/js/*.js'], 
						dest: './site/dist/js/',  
						filter: 'isFile', 
						flatten: true
					}
				],
			},
		},
		htmlmin: {                                     
			dist: {
				options: {    
			    	removeComments: false,
			    	collapseWhitespace: true,
			    	minifyJS: true
			  	},
			  	files: {
			    	'./site/dist/index.html': './site/index.html'
			  	}
			}
		}		
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // Register tasks
    grunt.registerTask('default', ['cssmin', 'copy', 'htmlmin']);
};