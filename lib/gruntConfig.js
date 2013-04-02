var fs = require('fs');
var npath = require('path');
var lrSnippet = require(base_path+'node_modules/grunt-contrib/node_modules/grunt-contrib-livereload/lib/utils').livereloadSnippet;
var folderMount = function folderMount(connect, point) {
  return connect.static(npath.resolve(point));
};

trig.loadNpmTasks('grunt-contrib', base_path);
trig.loadNpmTasks('grunt-preprocess', base_path);
trig.loadNpmTasks('grunt-env', base_path);
trig.loadNpmTasks('grunt-regarde', base_path);

grunt.log.muted = true;

gruntConfig = {
  connect: {
    livereload: {
      options: {
        port: 8000,
        middleware: function(connect, options) {
          return [lrSnippet, folderMount(connect, options.base)]
        },
        base: '.stage/app'
      }
    }
  },
  clean: [".stage"],
  copy: {
    deps: {
      files: [
        {
          dest: '.stage/app/lib/angular/',
          src: base_path + "deps/angular/*",
          cwd: "",
          expand: true,
          flatten: true
        }
      ]
    },
    stage: {
      files:[
        {
          dest: '.stage/',
          src: "app/**/*",
          cwd: "",
          expand: true
        }
      ]
    }
  },
  stylus: {
    compile: {
      options: {
        use: [
          require('fluidity') // use stylus plugin at compile time
        ]
      },
      files: {
        '.stage/app/styles/main.css': ['app/styles/*.styl'] // compile and concat into single file
      }
    }
  },
  karma: {
    basePath: '../../',
    unit: {
      configFile: 'test/config/karma.conf.js',
      basePath: '../../',
      singleRun: true,
      autoWatch: false
    },
    watch: {
      configFile: 'test/config/karma.conf.js',
      autoWatch: true,
      singleRun: false,
      basePath: '../../'
    },
    e2e: {
      configFile: 'test/config/karma-e2e.conf.js',
      basePath: '../../'
    }
  },
  regarde: {
    app: {
      files: ['app/**/*.js', 'app/**/*.html'],
      tasks: ['env:development', 'copy:stage', 'preprocess', 'livereload'],
      options: {
        spawn: false
      }
    }
  },
  livereload: {
    port: 35729 // Default livereload listening port.
  },
  env: {
    development: {
      ENV: 'development'
    },
    production: {
      ENV: 'production'
    }
  },
  preprocess: {
    multifile: {
      files: {
        '.stage/app/index.html' : 'app/index.html'
      }
    }
  }
}