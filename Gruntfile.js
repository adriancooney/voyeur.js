module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/* <%= pkg.name %> v<%= pkg.version %> (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <%= pkg.homepage %> */'
            },
            build: {
                src: '<%= pkg.name %>.js',
                dest: '<%= pkg.name %>.min.js'
            }
        },

        bumpup: ['package.json', 'bower.json'],

        release: {
            options: {
                bump: false, //default: true
                tagName: 'v<%= version %>', //default: '<%= version %>'
                commitMessage: 'release v<%= version %>', //default: 'release <%= version %>'
                tagMessage: 'tagging version v<%= version %>' //default: 'Version <%= version %>'
            }
        },
        jshint: {
            src: ['Gruntfile.js', '<%= pkg.name %>.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-release');
    grunt.loadNpmTasks('grunt-bumpup');
    
    // Default task(s).
    grunt.registerTask('default', ['uglify', 'jshint']);

};