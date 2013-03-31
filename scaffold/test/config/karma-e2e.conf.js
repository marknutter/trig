basePath = '../';

files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  'test/e2e/**/*.js'
];

// server port
port = 8081;

// runner port
runnerPort = 9100;

// auto-watch off by default
autoWatch = false;
singleRun = true;

browsers = ['Chrome'];

reporters = ['dots', 'junit'];

junitReporter = {
  outputFile: 'test/output/e2e-results.xml'
};

proxies = {
  '/': 'http://localhost:8000/'
};
