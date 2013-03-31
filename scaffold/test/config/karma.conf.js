basePath = '../../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  '.stage/app/lib/angular/angular.js',
  '.stage/app/lib/angular/angular-*.js',
  '.stage/app/lib/*.js',
  'test/lib/angular-mocks.js',
  '.stage/app/app.js',
  '.stage/app/controllers/*.js',
  '.stage/app/filters/*.js',
  '.stage/app/directives/*.js',
  '.stage/app/models/*.js',
  '.stage/app/services/*.js',
  'test/spec/**/*.js'
];

// server port
port = 8081;

// runner port
runnerPort = 9100;

browsers = ['PhantomJS'];

reporters = ['dots', 'junit'];

junitReporter = {
  outputFile: 'test/output/unit-results.xml'
};
