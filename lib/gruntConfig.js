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
trig.loadNpmTasks('grunt-html2js', base_path);
trig.loadNpmTasks('grunt-angular-templates', base_path);
trig.loadNpmTasks('grunt-contrib-htmlmin', base_path);


grunt.log.muted = false;

gruntConfig = {
  connect: {
    livereload: {
      options: {
        port: 8000,
        middleware: function(connect, options) {
          return [lrSnippet, folderMount(connect, options.base)]
        },
        base: '.stage/'
      }
    },
    server: {
      options: {
        port: 8001,
        base: '.stage/'
      }
    },
    production: {
      options: {
        port: 8002,
        base: 'production/'
      }
    }
  },

  cssmin: {
    compress: {
      files: {
        'production/main.min.css': ['.stage/src/**/*.css', '.stage/vendor/**/*.css']
      }
    }
  },
  html2js: {
    options: {
      // custom options, see below
    },
    main: {
      src: ['src/app/**/*.html','src/common/**/*.html'],
      dest: '.stage/src/templates.js'
    },
  },
  ngtemplates: {
    app: {
      src: 'src/**/*.html',
      dest: '.stage/src/templates.js',
      options: {
        htmlmin: {
          collapseBooleanAttributes:      true,
          collapseWhitespace:             true,
          removeAttributeQuotes:          true,
          removeComments:                 true, // Only if you don't use comment directives!
          removeEmptyAttributes:          true,
          removeRedundantAttributes:      true,
          removeScriptTypeAttributes:     true,
          removeStyleLinkTypeAttributes:  true
        }
      }
    }
  },
  clean: {
    stage: ['.stage'],
    production: ['.stage', 'production/app.concat.js', 'production/app.concat.ngmin.js'],
    productionAppJs: ['production/*.js']
  },
  concat: {
    options: {
      separator: ';'
    },
    dist: {
      // the files to concatenate
      src: [
        '.stage/vendor/angular.js',
        '.stage/vendor/*.js',
        '.stage/src/app.js',
        '.stage/src/**/*.js'
      ],
      // the location of the resulting JS file
      dest: 'production/app.concat.js'
    },
    ngtemplate: {
      src: [
        '.stage/templates.js',
        'production/app.concat.js'
      ],
      dest: 'production/app.concat.js'
    }
  },
  uglify: {
    options: {
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
      mangle: false
    },
    dist: {
      files: {
        'production/app.min.<%= grunt.timestamp %>.js': ['production/app.concat.ngmin.js'],
        'native_apps/www/js/app.min.js': ['production/app.concat.ngmin.js']
      }
    }
  },
  ngmin: {
    app: {
      src: ['production/app.concat.js'],
      dest: 'production/app.concat.ngmin.js'
    }
  },
  s3: {
    key: trigConfig ? trigConfig.aws.accessKeyId : '',
    secret: trigConfig ? trigConfig.aws.secretAccessKey : '',
    bucket: trigConfig ? trigConfig.domainName : '',
    access: 'public-read',

    upload: [
      { src: 'production/*', dest: '/'},
      { src: 'production/images/*', dest: '/images/' },
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
        'vendor/angular.js': "bower_components/angular/angular.js",
        'vendor/angular-csp.css': "bower_components/angular/angular-csp.css",
        'vendor/angular-cookies.js': "bower_components/angular-cookies/angular-cookies.js",
        'vendor/angular-resource.js': "bower_components/angular-cookies/angular-cookies.js",
        'vendor/angular-route.js': "bower_components/angular-route/angular-route.js",
        'vendor/angular-loader.js': "bower_components/angular-loader/angular-loader.js",
        'vendor/angular-sanitize.js': "bower_components/angular-sanitize/angular-sanitize.js",
        'vendor/angular-ui.js': "bower_components/angular-ui/build/angular-ui.js",
        'vendor/angular-ui-ieshiv.js': "bower_components/angular-ui/build/angular-ui-ieshiv.js",
        'vendor/angular-ui.css': "bower_components/angular-ui/build/angular-ui.css",
        'vendor/bootstrap.css': "bower_components/bootstrap/dist/css/bootstrap.css",
        'vendor/fonts/glyphicons-halflings-regular.eot': "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot",
        'vendor/fonts/glyphicons-halflings-regular.svg': "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg",
        'vendor/fonts/glyphicons-halflings-regular.ttf': "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf",
        'vendor/fonts/glyphicons-halflings-regular.woff': "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff"
      }
    },
    stage: {
      files:[
        {
          dest: '.stage/',
          src: "src/**/*",
          cwd: "",
          expand: true
        },
        {
          dest: '.stage/',
          src: "vendor/**/*",
          cwd: "",
          expand: true
        }
      ]
    },
    native: {
      files: [
        {
          dest: 'native_apps/www/views',
          src: "production/views/*.html",
          cwd: "",
          expand: true,
          flatten: true
        },
        { dest: 'native_apps/www/index.html', src: "production/index.html" },
        { dest: 'native_apps/www/css/main.min.css', src: 'production/main.min.css'}
      ]
    },
    production: {
      files:[
        {
          dest: 'production/index.html',
          src: ".stage/index.html"
        },
        {
          dest: 'production/fonts',
          src: "vendor/fonts/*",
          cwd: "",
          expand: true,
          flatten: true
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
          src: ['production/index.html'],
          dest: 'production/index.html'
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
        '.stage/src/styles/main.css': ['src/**/*.styl'] // compile and concat into single file
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
      files: ['src/**/*.js', 'src/**/*.html', 'src/**/*.styl', 'src/**/*.css'],
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
        '.stage/index.html': 'index.html',
        '.stage/src/app.js': 'src/app.js'
      }
    }
  }
}