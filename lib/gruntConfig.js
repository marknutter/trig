var fs = require('fs');
var npath = require('path');
var lrSnippet = require(base_path+'node_modules/grunt-contrib/node_modules/grunt-contrib-livereload/lib/utils').livereloadSnippet;
var folderMount = function folderMount(connect, point) {
  return connect.static(npath.resolve(point));
};

grunt.timestamp = (new Date()).getTime();

trig.loadNpmTasks('grunt-contrib', base_path);
trig.loadNpmTasks('grunt-contrib-connect', base_path);
trig.loadNpmTasks('grunt-preprocess', base_path);
trig.loadNpmTasks('grunt-env', base_path);
trig.loadNpmTasks('grunt-regarde', base_path);
trig.loadNpmTasks('grunt-replace', base_path);
trig.loadNpmTasks('grunt-ngmin', base_path);
trig.loadNpmTasks('grunt-s3', base_path);
trig.loadNpmTasks('grunt-bower-task', base_path);
trig.loadNpmTasks('grunt-exec', base_path);

grunt.log.muted = false;

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
    },
    server: {
      options: {
        port: 8001,
        base: '.stage/app'
      }
    }
  },
  cssmin: {
    compress: {
      files: {
        'production/css/main.min.css': ['.stage/app/vendor/*.css', '.stage/app/styles/main.css']
      }
    }
  },
  clean: {
    stage: ['.stage'],
    production: ['.stage', 'production/app/js/app.concat.js', 'production/app/js/app.concat.ngmin.js'],
    productionAppJs: ['production/app/js/*.js']
  },
  concat: {
    options: {
      separator: ';'
    },
    dist: {
      // the files to concatenate
      src: [
        '.stage/app/vendor/angular.js',
        '.stage/app/vendor/*.js',
        '.stage/app/app.js',
        '.stage/app/controllers/*.js',
        '.stage/app/directives/*.js',
        '.stage/app/models/*.js',
        '.stage/app/filters/*.js',
        '.stage/app/services/*.js'
      ],
      // the location of the resulting JS file
      dest: 'production/app/js/app.concat.js'
    }
  },
  uglify: {
    options: {
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
    },
    dist: {
      files: {
        'production/app/js/app.min.<%= grunt.timestamp %>.js': ['production/app/js/app.concat.ngmin.js'],
        'native_apps/www/js/app.min.js': ['production/app/js/app.concat.ngmin.js']
      }
    }
  },
  ngmin: {
    app: {
      src: ['production/app/js/app.concat.js'],
      dest: 'production/app/js/app.concat.ngmin.js'
    }
  },
  s3: {
    key: trigConfig ? trigConfig.aws.accessKeyId : '',
    secret: trigConfig ? trigConfig.aws.secretAccessKey : '',
    bucket: trigConfig ? trigConfig.domainName : '',
    access: 'public-read',

    upload: [
      { src: 'production/app/*', dest: '/'},
      { src: 'production/app/views/*', dest: '/views/' },
      { src: 'production/app/images/*', dest: '/images/' },
      { src: 'production/app/vendor/*', dest: '/vendor/' },
      { src: 'production/app/css/*', dest: '/css/' },
      { src: 'production/app/js/*', dest: '/js/' }
    ]
  },
  copy: {
    scaffold: {
      files:[
        {
          dest: './',
          src: "**/*",
          cwd: base_path + 'scaffold',
          expand: true
        }
      ]
    },
    deps: {
      files: {
        'app/vendor/angular.js': "bower_components/angular/angular.js",
        'app/vendor/angular-csp.css': "bower_components/angular/angular-csp.css",
        'app/vendor/angular-cookies.js': "bower_components/angular-cookies/angular-cookies.js",
        'app/vendor/angular-resource.js': "bower_components/angular-cookies/angular-cookies.js",
        'app/vendor/angular-route.js': "bower_components/angular-route/angular-route.js",
        'app/vendor/angular-loader.js': "bower_components/angular-loader/angular-loader.js",
        'app/vendor/angular-sanitize.js': "bower_components/angular-sanitize/angular-sanitize.js",
        'app/vendor/angular-ui.js': "bower_components/angular-ui/build/angular-ui.js",
        'app/vendor/angular-ui-ieshiv.js': "bower_components/angular-ui/build/angular-ui-ieshiv.js",
        'app/vendor/angular-ui.css': "bower_components/angular-ui/build/angular-ui.css",
        'app/vendor/bootstrap.css': "bower_components/bootstrap/dist/css/bootstrap.css",
        'app/vendor/glyphicons-halflings-regular.eot': "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot",
        'app/vendor/glyphicons-halflings-regular.svg': "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg",
        'app/vendor/glyphicons-halflings-regular.ttf': "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf",
        'app/vendor/glyphicons-halflings-regular.woff': "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff"
      }
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
    },
    native: {
      files: [
        {
          dest: 'native_apps/www/views',
          src: "production/app/views/*.html",
          cwd: "",
          expand: true,
          flatten: true
        },
        { dest: 'native_apps/www/index.html', src: "production/app/index.html" },
        { dest: 'native_apps/www/css/main.min.css', src: 'production/css/main.min.css'}
      ]
    },
    production: {
      files:[
        {
          dest: 'production/app/views',
          src: ".stage/app/views/*.html",
          cwd: "",
          expand: true,
          flatten: true
        },
        {
          dest: 'production/app/index.html',
          src: ".stage/app/index.html"
        }
      ]
    }
  },
  replace: {
    production: {
      options: {
        variables: {
          'timestamp': '<%= grunt.timestamp %>'
        }
      },
      files: [
        {
          src: ['production/app/index.html'],
          dest: 'production/app/index.html'
        }
      ]
    }
  },
  exec: {
    cordova: {
      cmd: function(command) {
        return "cordova " + command;
      },
      cwd: "native_apps"
    },
    bowerInstall: {
      cmd: function() {
        return "bower install";
      }
    },
    trigInit: {
      cmd: function() {
        return "trig init";
      }
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
      files: ['app/**/*.js', 'app/**/*.html', 'app/**/*.styl', 'app/**/*.css'],
      tasks: ['env:development', 'stagecopy', 'preprocess', 'livereload'],
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
    },
    test: {
      ENV: 'test'
    }
  },
  preprocess: {
    multifile: {
      files: {
        '.stage/app/index.html': 'app/index.html',
        '.stage/app/app.js': 'app/app.js'
      }
    }
  }
}