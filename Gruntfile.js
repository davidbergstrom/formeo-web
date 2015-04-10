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

        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: ['js-source/*.js'],
                // the location of the resulting JS file
                dest: 'js/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                'js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
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

    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('build', ['concat', 'uglify']);

    // Live reload site when files are updated
    // Don't forget: <script src="http://localhost:1337/livereload.js"></script>
    grunt.registerTask( "default", ["watch"] );

};

