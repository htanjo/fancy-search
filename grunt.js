/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        // General settings
        pkg: '<json:package.json>',
        meta: {
            banner: '/*!\n' +
                ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> build <%= grunt.template.today("yyyy/mm/dd") %>\n' +
                ' * (c) 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * Includes:\n' +
                ' * - RequireJS v2.0.6 <http://requirejs.org/> (c) 2010-2012, The Dojo Foundation\n' +
                ' * - RequireJS text v2.0.3 <http://github.com/requirejs/text> (c) 2010-2012, The Dojo Foundation\n' +
                ' * - Backbone.js v0.9.2 <http://backbonejs.org/> (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.\n' +
                ' * - Underscore.js v1.3.3 <http://underscorejs.org/> (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.\n' +
                ' * - jQuery v1.8.1 <http://jquery.com/> (c) 2012 jQuery Foundation\n' +
                ' * - Handlebars.js v1.0.beta.6 <http://handlebarsjs.com/> (c) 2012 Yehuda Katz\n' +
                ' * - jQuery Masonry v2.1.05 <http://masonry.desandro.com/> (c) 2012 David DeSandro\n' +
                ' * - tipsy v1.0.0a <http://onehackoranother.com/projects/jquery/tipsy/> (c) 2008-2010 jason frame\n' +
                ' * - leanModal v1.1 <http://leanmodal.finelysliced.com.au/> (c) 2012 Finely Sliced\n' +
                ' */'
        },

        // Lints and Tests
        lint: {
            files: ['grunt.js', 'src/js/main.js', 'src/js/app/**/*.js']
        },
        qunit: {
            files: ['test/*.html']
        },
        htmllint: {
            all: ['src/*.html']
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true
            },
            globals: {
                jQuery: true
            }
        },

        // JavaScript
        concat: {
            dist: {
                src: [
                    '<banner:meta.banner>',
                    'dist/js/main.js'
                ],
                dest: 'dist/js/main.js'
            }
        },
        requirejs: {
            compile: {
                options: {
                    appDir: 'src',
                    baseUrl: 'js',
                    modules: [{
                        name: 'main',
                        include: ['requireLib']
                    }],
                    mainConfigFile: 'src/js/main.js',
                    dir: 'dist',
                    optimize: 'uglify',
                    /*uglify: {
                        defines: {
                            __DEBUG: ['name', 'false']
                        }
                    },*/
                    preserveLicenseComments: false,
                    removeCombined: true,
                    optimizeCss: 'standard.keepComments.keepLines'
                }
            }
        },

        // CSS
        less: {
            compile: {
                options: {
                    paths: ['src/less']
                },
                files: {
                    'src/css/main.css': 'src/less/main.less'
                }
            }
        },
        mincss: {
            compress: {
                files: {
                    'dist/css/main.css': 'src/css/main.css'
                }
            }
        },

        // Images
        inlineImg: {
            src: ['dist/*.html', 'dist/css/*.css'],
            dest: 'dist',
            ie8: true
        },
        pngmin: {
            src: [
                'src/img/*.png'
            ],
            dest: 'dist'
        },

        // Distributing
        clean: {
            dist: ['dist/build.txt', 'dist/js/app'],
            less: ['dist/less'],
            inlineImg: ['dist/img']
        },
        replace: {
            dist: {
                options: {
                    variables: {
                        '<script src="js/libs/require/require.js" data-main="js/main"></script>': '<script src="js/main.js"></script>',
                        '@@version': '<%= pkg.version %>'
                    },
                    prefix: ''
                },
                files: {
                    'dist/': ['dist/index.html']
                }
            }
        },

        // Documentation
        yuidoc: {
            compile: {
                name: 'Fancy Search',
                description: 'Simple search application with Web API.',
                version: '0.1.0',
                url: '',
                options: {
                    paths: 'src/js/app',
                    outdir: 'docs'
                }
            }
        },

        // Watch
        watch: {
            lint: {
                files: '<config:lint.files>',
                tasks: 'lint'
            },
            less: {
                files: 'src/less/*.less',
                tasks: 'less'
            }/*,
            htmllint: {
                files: '<config:htmllint.all>',
                tasks: 'htmllint'
            }*/
        }

    });

    // Load modules.
    grunt.loadNpmTasks('grunt-contrib');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-html');
    grunt.loadNpmTasks('grunt-imagine');

    // Default task.
    grunt.registerTask('default', 'lint qunit yuidoc less requirejs replace concat mincss pngmin clean:dist clean:less');

};
