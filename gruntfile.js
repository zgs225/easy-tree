/**
 * Created by yuez on 14-1-9.
 */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: {
                    'dist/js/easyTree.min.js': ['src/easyTree.js']
                }
            }
        },
        jshint: {
            files: ['gruntfile.js', 'src/easyTree.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'dist/css/easyTree.min.css': ['css/easyTree.css']
                }
            }
        },
        less: {
            production: {
                options: {
                    cleancss: true
                },
                files: {
                    'css/easyTree.css': ['less/easyTree.less']
                }
            }
        },
        jade: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    "index.html": ["jade/index.jade"]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jade');

    grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']);
};
