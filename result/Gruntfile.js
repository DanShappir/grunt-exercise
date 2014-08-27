'use strict'

module.exports = function(grunt) {

  grunt.config.init({
    jshint: {
      src: ['src/**/*.js','!src/js/lib/**/*.js'],
      options: {
        asi: true
      }
    },
    csslint: {
      src: ['src/**/*.css']
    },
    tape: {
      files: ['test/**/*.js']
    },
    watch: {
      js: {
        files: ['src/**/*.js'],
        tasks: ['jshint', 'tape']
      },
      css: {
        files: ['src/**/*.css'],
        tasks: ['csslint']
      }
    },
    clean: {
      src: ['target']
    },
    uglify: {
      main: {
        files: {
          'target/scripts.min.js': ['src/js/**/*.js']
        }
      }
    },
    cssmin: {
      main: {
        files: {
          'target/style.min.css': ['src/css/**/*.css']
        }
      }
    },
    processhtml: {
      options: {
        // Task-specific options go here.
      },
      // main: {
        'target/index.html': ['src/index.html']
      // }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**', '!js/**', '!css/**', '!index.html'],
            dest: 'target/'
          }
        ]
      }
    },
    connect: {
      dev: {
        options: {
          useAvailablePort: true,
          base: 'src',
          open: true,
          keepalive: true
        }
      },
      prod: {
        options: {
          useAvailablePort: true,
          base: 'target',
          open: true,
          keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-csslint')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-processhtml')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-tape')

  grunt.registerTask('check', ['jshint', 'csslint', 'tape'])
  grunt.registerTask('build', ['clean', 'copy', 'uglify', 'cssmin', 'processhtml'])

  grunt.registerTask('default', ['check', 'build'])
  grunt.registerTask('dev', ['connect:dev'])
  grunt.registerTask('prod', ['default', 'connect:prod'])

}
