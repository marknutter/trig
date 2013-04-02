grunt.registerTask('stagecopy', ['env:development', 'copy:stage', 'copy:deps', 'preprocess', 'stylus']);

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