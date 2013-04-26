
trig = {
  runServer: function() {
    var path = "";
    grunt.task.run(['env:development', 'stagecopy', 'livereload-start', 'connect', 'regarde']);
    console.log('   \033[36mapp running at localhost:8000\033[0m');
    grunt.task.start();
  },

  updateConfigFile: function() {
    // var configString = JSON.stringify(trigConfig, null, 4);
    jf.spaces = 2;
    jf.writeFileSync("config.json", trigConfig);
  },

  createApp: function(path) {
    path = path || '.';
    console.log("path: " + path);
    grunt.initConfig({
      copy: {
        scaffold: {
          files:[
            {
              dest: path + '/',
              src: "**/*",
              cwd: base_path + 'scaffold',
              expand: true
            }
          ]
        }
      }
    });

    this.emptyDirectory(path, function(empty){
      if (empty || program.force) {
        grunt.task.run(['copy:scaffold']);
        grunt.task.start();
        mkdirp(path + '/app/directives');
        mkdirp(path + '/app/filters');
        mkdirp(path + '/app/services');
        mkdirp(path + '/app/vendor');
        mkdirp(path + '/app/models');
        console.log('   \033[36mapp created at ' + path + '\033[0m');
      } else {
        program.confirm('destination is not empty, continue? ', function(ok){
          if (ok) {
            process.stdin.destroy();
            grunt.task.start();
          } else {
            abort('aborting');
          }
        });
      }
    });
  },

  emptyDirectory: function(path, fn) {
    fs.readdir(path, function(err, files){
      if (err && 'ENOENT' != err.code) throw err;
      fn(!files || !files.length);
    });
  },

  createS3BucketWebsite: function() {

    try {

      AWS.config.update({accessKeyId: trigConfig.aws.accessKeyId, secretAccessKey: trigConfig.aws.secretAccessKey});
      var s3 = new AWS.S3();
      console.log('creating bucket');
    } catch(e) {
      console.log('aws credentials problem: ' + e);
    }
    s3.client.createBucket({Bucket: trigConfig.domainName}, function(err, data) {

      if (!err) {

        s3.client.putBucketWebsite(
          {
            Bucket: trigConfig.domainName,
            WebsiteConfiguration:
            {
              IndexDocument:
              {
                Suffix: 'index.html'
              }
            }
          },
        function(err, data) {
          if (err) {
            console.log(err);
          }
        });

      } else {
        console.log(err);
      }


    });
  },

  /**
   *  Custom Grunt Plugin Loader
   */

  loadTaskDepth: 0,

  loadNpmTasks: function(name, root_path) {
    var _this = this;
    this.loadTasksMessage('"' + name + '" local Npm module');
    var root = npath.resolve(root_path + 'node_modules');
    var pkgfile = npath.join(root, name, 'package.json');
    var pkg = grunt.file.exists(pkgfile) ? grunt.file.readJSON(pkgfile) : {keywords: []};
    if (pkg.keywords && pkg.keywords.indexOf('gruntcollection') !== -1) {
      this.loadTaskDepth++;
      Object.keys(pkg.dependencies).forEach(function(depName) {
        var filepath = grunt.file.findup('node_modules/' + depName, {
          cwd: npath.resolve(root_path + 'node_modules', name),
          nocase: true
        });
        if (filepath) {
          _this.loadNpmTasks(npath.relative(root, filepath), root_path);
        }
      });
      _this.loadTaskDepth--;
      return;
    }
    var tasksdir = npath.join(root, name, 'tasks');
    if (grunt.file.exists(tasksdir)) {
      grunt.loadTasks(tasksdir);
    } else {
      grunt.log.error('Local Npm module "' + name + '" not found. Is it installed?');
    }
  },
  loadTasksMessage: function(info) {
    if (this.loadTaskDepth === 0) { lastInfo = info; }
    grunt.verbose.subhead('Registering ' + info + ' tasks.');
  }
}

