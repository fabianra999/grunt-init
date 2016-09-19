'use strict';
module.exports = function(grunt) {
  // cargamos todas las tareas
  require('load-grunt-tasks')(grunt);
  // Muestra tiempo transcurrido
  //require('time-grunt')(grunt);

  var jsFileList = [
    'assets/js/_*.js'
  ];

  // Configuracion del proyecto.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js',
        'assets/js/*/*.js'
      ]
    },
    less: {
      commons: {
        options: {
          compress: false,
          strictMath: true,

          //source maps
          sourceMap: true,
          sourceMapFilename: 'dist/css/comunes.css.map',

          //sobre escribe ruta al sourceMap
          sourceMapURL: 'comunes.css.map'
        },
        files: {
          'dist/css/comunes.css': [ 'assets/less/comunes.less' ]
        }
      },
      desktop: {
        options: {
          compress: false,
          strictMath: true,

          //source maps
          sourceMap: true,
          sourceMapFilename: 'dist/css/desktop.css.map',

          //sobre escribe ruta al sourceMap
          sourceMapURL: 'desktop.css.map'
        },
        files: {
          "dist/css/desktop.css": [ "assets/less/desktop.less" ]
        }
      },
      mobile: {
        options: {
          compress: false,
          strictMath: true,

          //source maps
          sourceMap: true,
          sourceMapFilename: 'dist/css/mobile.css.map',

          //sobre escribe ruta al sourceMap
          sourceMapURL: 'mobile.css.map'
        },
        files: {
          "dist/css/mobile.css": [ "assets/less/mobile.less" ]
        }
      },
      build: {
        files: {
          "dist/css/mobile.css": [
            "assets/less/mobile.less"
          ],
          "dist/css/comunes.css": [
            "assets/less/comunes.less"
          ],
          "dist/css/desktop.css": [
            "assets/less/desktop.less"
          ]
        },
        options: {
          compress: true
        }
      }
    },
    concat: {
      libs:{
        src: [
          'assets/js/libs/*.js',
          'assets/js/libs/*/*.js',
          'assets/js/libs/*/*/*.js'
        ],
        dest: 'dist/js/libs.js'
      },
      comunes:{
        src: ['assets/js/*.js'],
        dest: 'dist/js/script.js'
      }
    },
    uglify: {
      libs: {
        src: ['dist/js/libs.js'],
        dest: 'dist/js/libs.js'
      },
      comunes:{
        src: ['dist/js/script.js'],
        dest: 'dist/js/script.js'
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      dev: {
        options: {
          map: {
            prev: 'dist/css/'
          }
        },
        src: [
          'dist/css/mobile.css',
          'dist/css/comunes.css',
          'dist/css/desktop.css'

        ]
      },
      build: {
        src: ['dist/css/mobile.css',
              'dist/css/comunes.css',
              'dist/css/desktop.css'
             ]
      }
    },
    watch: {
      options:{
        livereload: true,
      },
      less: {
        files: [
          'assets/less/*.less',
          'assets/less/*/*.less',
          'assets/less/*/*/*.less'
        ],
        tasks: ['less:mobile', 'less:commons', 'less:desktop', 'autoprefixer:dev']
      },
      js: {
        files: [
          jsFileList,
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'concat']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: false
        },
        files: [
          'assets/css/main.css',
          'assets/js/scripts.js'
        ]
      }
    },
    clean: {
      scripts: 'dist/js', 
      estilos: 'dist/css'
    }
  });

  // resgistrar las tareas
  grunt.registerTask('default', [
    'dev'
  ]);

  grunt.registerTask('dev', [
    'jshint',
    'less:commons',
    'less:desktop',
    'less:mobile',
    'autoprefixer:dev',
    'concat'
  ]);

  grunt.registerTask('build', [
    'clean',
    'jshint',
    'less:build',
    'autoprefixer:build',
    'concat',
    'uglify'
  ]);
};