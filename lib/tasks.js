grunt.registerTask('stagecopy', ['copy:stage', 'preprocess', 'stylus']);
grunt.registerTask('build:production', ['env:production', 'clean:productionAppJs', 'stagecopy', 'copy:production', 'ngtemplates', 'concat', 'ngmin:app', 'concat:ngtemplate', 'uglify', 'replace:production', 'cssmin', 'clean:production']);
grunt.registerTask('build:native', ['build:production', 'clean:nativeAppJs', 'copy:native', 'exec:cordova:build']);

grunt.registerTask('installDeps', ['copy:deps']);

grunt.registerMultiTask('karma', 'run karma.', function() {
  var done = this.async();
  var options = this.options();
  var data = this.data;
  //merge options onto data, with data taking precedence
  Object.keys(this.options()).forEach(function(prop){
    if (!data[prop]) data[prop] = options[prop];
  });

  if (data.configFile) {
    data.configFile = grunt.template.process(data.configFile);
  }
  //support `karma run`, useful for grunt watch
  if (this.flags.run){
    runner.run(data, finished.bind(done));
    return;
  }
  server.start(data, finished.bind(done));
});
function finished(code){ process.exit() }


grunt.registerTask('createS3BucketWebsite', 'deploy the app to an S3 static website bucket', function() {
  var url = "http://" + trigConfig.domainName + ".s3-website-us-east-1.amazonaws.com";
  trig.createS3BucketWebsite(function(url) {
  });
});



grunt.registerTask('openS3Url', 'open S3 url in default browser', function() {
  var url = "http://" + trigConfig.domainName + ".s3-website-us-east-1.amazonaws.com";
  exec("open " + url);
  process.exit();
})