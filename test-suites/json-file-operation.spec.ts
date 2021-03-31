import { browser, element, by, protractor } from "protractor";

describe('JSON File Operation Tests: ', () => {

    browser.ignoreSynchronization = true; // This is for non-angular websites

    it('As a user I can read data from JSON file', function () {

        // set implicit time to 30 seconds
        // browser.manage().timeouts().implicitlyWait(30000);

        // navigate to the url
        // browser.get("https://google.com");
        // console.log(browser.params.config.uat.env)
        // username
        //npm run test appUrl='Test'
        console.log(browser.params.username);
        console.log(browser.params.config.username);
        console.log(browser.params.config.browser);
        console.log(browser.params.config.report);
        // let uat = browser.params.config.uat;
        // console.log()
        // for(let value of uat) {
        //     console.log(value.env);
        //     console.log(value.usermname);
        //     console.log(value.password);
        // }

    })

    xit('As a user I can read data from JSON file', function () {

        // set implicit time to 30 seconds
        browser.manage().timeouts().implicitlyWait(30000);

        // navigate to the url
        browser.get("https://google.com");

        // import the fs module
        const fs = require('fs');

        // read the file into raw data
        let rawdata = fs.readFileSync('test-data\\test-data.json');

        // parse the raw data into meaningful JSON format
        let data = JSON.parse(rawdata);

        let urlValue = data["url"];
        console.log("URL value from JSON file is: " + urlValue);

        // enter url value
        element(by.name("q")).sendKeys(urlValue);

        // hit enter key
        browser.actions().sendKeys(protractor.Key.ENTER).perform();

    })

});