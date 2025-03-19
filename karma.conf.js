module.exports = function(config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine'],
      files: [

        'src/test.ts'
      ],
      preprocessors: {
        'src/test.ts': ['karma-typescript']  
      },
      plugins: [
        'karma-jasmine',
        'karma-chrome-launcher',
        'karma-jasmine-html-reporter',
        'karma-typescript'
      ],
      reporters: ['progress', 'kjhtml'],  
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,  
      browsers: ['Chrome'],  
      singleRun: false, 
      restartOnFileChange: true
    });
  };
  