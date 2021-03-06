module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            default: {
                src: [
                    'dist',
                    'build'
                ]
            }
        },
        version: {
            // options: {},
            defaults: {
                src: ['src/version.js', 'bower.json']
            }
        },

        copy: {
            bower: {
                src: [
                    'bower_components/image-jpeg2000/dist/jpx.min.js',
                    'bower_components/cornerstone/dist/cornerstone.min.css',
                    'bower_components/cornerstone/dist/cornerstone.min.js',
                    'bower_components/dicomParser/dist/dicomParser.min.js',
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/jquery/dist/jquery.min.map',
                    'bower_components/cornerstoneTools/dist/cornerstoneTools.js',
                    'bower_components/cornerstoneMath/dist/cornerstoneMath.js',
                    'bower_components/cornerstoneMath/dist/bootstrap.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/bootstrap/dist/css/bootstrap.min.css'
                ],
                dest: 'examples',
                expand: true,
                flatten: true
            }
        },
        concat: {
            build: {
                src: ['src/cjsHeader.js', 'src/imageLoaders/loadImage.js', 'src/**/*.js', '!src/footer.js', 'src/footer.js'],
                dest: 'build/built.js'
            },
            dist: {
                options: {
                    stripBanners: true,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> ' +
                    '| (c) 2014 Chris Hafey | https://github.com/chafey/cornerstoneWADOImageLoader */\n'
                },
                src: ['build/built.js'],
                dest: 'dist/cornerstoneWADOImageLoader.js'
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js', 'test/*.js'],
                tasks: ['concat:build', 'concat:dist', 'jshint', 'qunit']
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('buildAll', ['clean', 'concat:build', 'concat:dist']);
    grunt.registerTask('default', ['buildAll']);
};