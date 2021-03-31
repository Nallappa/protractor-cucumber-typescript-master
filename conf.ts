	'use strict';
    const { join } = require('path');
    import { browser } from 'protractor';
    import { Logger, BrowserDriver,EmailUtility} from './index'
    declare const allure: any;
    var retry = require('protractor-retry').retry;
	// Require protractor-beautiful-reporter to generate reports.
	let HtmlReporter = require('protractor-beautiful-reporter');
    // let AllureReporter = require('jasmine-allure-reporter');
    import AllureReporter from 'jasmine-allure-reporter';
    import jasmineReporters from 'jasmine-reporters';
    const JSONReporter = require('jasmine-json-test-reporter');
    const { SpecReporter } = require('jasmine-spec-reporter');
    const fs = require('fs-extra');
    import HTMLReport from 'protractor-html-reporter-2';
    const suites = require(join(process.cwd(), 'suites.json'));
    let suitesAll = {};
    let config = require('./globalParams');
  

    for(let suite in suites){
        Logger.info(suites[suite])
        suitesAll[suite] = suites[suite].split(',');
    }
    Logger.info(`The suites are ${suitesAll}`);
  

exports.config = {
    // chromeOnly:true,
     // The address of a running selenium server.
    directConnect: true,

    // multiCapabilities : [{
    //     'browserName' : 'chrome'
    // },
    //      {
    //      'browserName' : 'firefox'
    //      }
    // ],

//    Capabilities to be passed to the webdriver instance.
    capabilities: {
        "browserName": "chrome",
        shardTestFiles : true,
        maxInstances: 3
        // chromeOptions: {
        //     args: ['--allow-file-access-from-files','--disable-gpu','--disable-web-security','disable-info-bars-true','same-site-by-default-cookies@1','--ignore-certifcate-errors'],
        // },
        // prefs: {
        //     download : {
        //        'prompt_for_download' : false,
        //        'directory_upgrade' : true,
        //        'default_directory' : '<DIRECTORY>' 
        //     }

        // },

    }, 
 
    SELENIUM_PROMISE_MANAGER : false,
    allScriptsTimeout : 45000, //Before performing any action, Protractor waits until there are no pending asynchronous tasks in your Angular application. This means that all timeouts and HTTP requests are finished.
    resultJsonOutputFile:"./testResults.json", //json report

    // Framework to use. Jasmine is recommended.
    framework: 'jasmine2',

    params: {
        login: {
          user: 'test',
          password: 'pwd'
        },
        username: "TestUsername",
        password: "appa",
        env: "Test",
        config :config
      },

      suites : suitesAll,
    // specs: ["../temp/test-suites/json-file-operation.spec.js"],
    // specs: ['./temp/test-suites/*.spec.js'],

    // suites: {
    //     angularjsspec: ["../temp/test-suites/first-test.spec.js"],
    //     jsonspec : ["../temp/test-suites/json-file-operation.spec.js"],
    //     superpec: ["../temp/test-suites/super-calculator.spec.js"]
    //   },

    
    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 90000, //If a spec (an 'it' block) takes longer than the Jasmine timeout
        isVerbose: true
    },
    
    beforeLaunch : ()  =>{
        Logger.info('This is in before launch');
    },

    onComplete: () => {
        Logger.info('This is on complete');
    },


    onPrepare: async () => {
        Logger.info('This is on Prepare');
        // browser.config = config;
        retry.onPrepare();
        await BrowserDriver.initializeBrowser();

        if(browser.params.report === 'Allure') {
            jasmine.getEnv().addReporter(new AllureReporter({
                    resultsDir: 'allure-results'
                }));

            jasmine.getEnv().afterEach(function(done){
                browser.takeScreenshot().then(function (png) {
                    allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                    }, 'image/png')();
                    done();
                })
                });
            }

            if(browser.params.report === 'Beautiful') {
                jasmine.getEnv().addReporter(new HtmlReporter({
                    baseDirectory: 'test-results',
                    preserveDirectory: false, // Preserve base directory
                    screenshotsSubfolder: 'screenshots',
                    jsonsSubfolder: 'jsons', // JSONs Subfolder
                    takeScreenShotsForSkippedSpecs: true, // Screenshots for skipped test cases
                    takeScreenShotsOnlyForFailedSpecs: false, // Screenshots only for failed test cases
                    docTitle: 'Test Automation Execution Report', // Add title for the html report
                    docName: 'TestResult.html', // Change html report file name
                    gatherBrowserLogs: true // Store Browser logs
                }).getJasmine2Reporter());
            }
        
      jasmine.getEnv().addReporter(new JSONReporter({
          file: 'jasmine-test-results.json',
          beautify: true,
          indentationLevel: 4 // used if beautify === true
      }));
    },

    afterLaunch : async ()  =>{
        Logger.info('This is in after launch');
        // return retry.afterLaunch(2);
        // await EmailUtility.senEmail();
    },

    onCleanUp : async() =>function(results) {
        Logger.info('This is on clean up');
        // retry.onCleanUp(results);
    }

}
















//Barutiful Reporter
// jasmine.getEnv().addReporter(new HtmlReporter({
//     baseDirectory: 'test-results',
//     preserveDirectory: false, // Preserve base directory
//     screenshotsSubfolder: 'screenshots',
//     jsonsSubfolder: 'jsons', // JSONs Subfolder
//     takeScreenShotsForSkippedSpecs: true, // Screenshots for skipped test cases
//     takeScreenShotsOnlyForFailedSpecs: false, // Screenshots only for failed test cases
//     docTitle: 'Test Automation Execution Report', // Add title for the html report
//     docName: 'TestResult.html', // Change html report file name
//     gatherBrowserLogs: true // Store Browser logs
// }).getJasmine2Reporter());


//Allure
// jasmine.getEnv().addReporter(new AllureReporter({
//     resultsDir: 'allure-results'
//   }));

//   jasmine.getEnv().afterEach(function(done){
//   browser.takeScreenshot().then(function (png) {
//       allure.createAttachment('Screenshot', function () {
//       return new Buffer(png, 'base64')
//       }, 'image/png')();
//       done();
//   })
//   });

