module.exports = function(grunt) {
    
    // load time-grunt and all grunt plugins found in the package.json
    require( 'time-grunt' )( grunt );
    require( 'load-grunt-tasks' )( grunt );

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        dirs: {
            base: '/',
            css: '/styles/build/',
            sass: 'www/styles/',
            js: 'www/js/build/'
        },

        shell : {
            jekyllBuild : {
                command : 'jekyll build'
            },
            jekyllServe : {
                command : 'jekyll serve'
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= dirs.css %>main.css': '<%= dirs.sass %>main.scss'
                }
            }
        },
        
        watch: {
            options : {
                spawn : false,
                interrupt : true,
                atBegin : true,
                livereload: true
            }
        }

    });

    grunt.registerTask( "serve", ["shell:jekyllServe"] );

    // Live reload site when files are updated
    // Don't forget: <script src="http://localhost:1337/livereload.js"></script>
    grunt.registerTask( "default", ["watch"] );

};

