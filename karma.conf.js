// Karma configuration

module.exports = function(config) {
  var angularVersion = '1.2.15';
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    frameworks: ["jasmine"],

    // list of files / patterns to load in the browser
    files: [
      'http://code.angularjs.org/' + angularVersion + '/angular.js',
      'http://code.angularjs.org/' + angularVersion + '/angular-resource.js',
      'http://code.angularjs.org/' + angularVersion + '/angular-mocks.js',
      'src/*.js',
      'test/*.js'
    ],


    // list of files to exclude
    exclude: [],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit'
    reporters: ['progress'],

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false

  });
};