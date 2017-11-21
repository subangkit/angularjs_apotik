module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower_concat: {
            all: {
                dest: {
                    'js': 'app/dist/bower.js',
                    'css': 'app/dist/bower.css'
                },
                exclude: [
                    'jquery',
		    'devextreme-web',
                    'cldrjs',
                    'cldr-data',
                    'globalize',
		    'domReady',
		    'html5-boilerplate',
                ],
                dependencies: {
                    'promise-tracker': 'lodash',
                    'restangular': 'angular',
                },
                bowerOptions: {
                    relative: false
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: {
                    'app/modules/build/MCatalog.js': ['app/modules/MCatalog.js'],
                    'app/modules/build/MInventory.js': ['app/modules/MInventory.js'],
                    'app/modules/build/MMain.js': ['app/modules/MMain.js'],
                    'app/modules/build/app.js': ['app/app.js'],
                }
            }
        },
        concat: {
            js: { //target
                src: [
                    'app/modules/build/app.js',
                    'app/modules/build/MMain.js',
                    'app/modules/build/MCatalog.js',
                    'app/modules/build/MInventory.js',
                ],
                dest: 'app/dist/app.js'
            },
            cldr: { //target
                src: [
                    'app/bower_components/cldrjs/dist/cldr.js',
                    'app/bower_components/cldrjs/dist/cldr/event.js',
                    'app/bower_components/cldrjs/dist/cldr/supplemental.js',
                    'app/bower_components/cldrjs/dist/cldr/unresolved.js'],
                dest: 'app/dist/cldr.js'
            },
            globalize: { //target
                src: [
                    'app/bower_components/globalize/dist/globalize.js',
                    'app/bower_components/globalize/dist/globalize/message.js',
                    'app/bower_components/globalize/dist/globalize/number.js',
                    'app/bower_components/globalize/dist/globalize/date.js',
                    'app/bower_components/globalize/dist/globalize/currency.js',
                ],
                dest: 'app/dist/globalize.js'
            },
        },
        uglify: {
            js: { //target
                src: ['app/dist/app.js'],
                dest: 'app/dist/app.js'
            },
            cldr: { //target
                src: ['app/dist/cldr.js'],
                dest: 'app/dist/cldr.js'
            },
            globalize: { //target
                src: ['app/dist/globalize.js'],
                dest: 'app/dist/globalize.js'
            },
        }
    });

    // Actually running things.
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');


    // Default task(s).
    grunt.registerTask('default', ['bower_concat', 'ngAnnotate', 'concat', 'uglify']);

};
