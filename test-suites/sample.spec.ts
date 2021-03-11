import { browser, element, by, protractor } from "protractor";
  const fs = require('fs');
//   let rawdata = fs.readFileSync('locators\\sample-locator.json');
import { angularjsPageHelper } from "../page-objects/pages/angularjs/angularjs.helper";
import { angularjsPageObjects } from "../page-objects/pages/angularjs/angularjs.po";
// import { commonPageHelper } from "../page-objects/common/common.helper";
import { angularjsPageConstants } from "../page-objects/pages/angularjs/angularjs.constants";
import {commonPageHelper, Logger, BrowserDriver, uiElement} from '../index';


beforeAll( async() => {
    await BrowserDriver.navigateTo('https://google.com');
});

describe('My Testing: ', () => {

    it('As a user I can read data from JSON file', async function () {

        // let rawdata = fs.readFileSync('test-data\\test-data.json');
        let rawdata = await fs.readFileSync('locators\\sample-locator.json');
        let data = JSON.parse(rawdata);
        let locatorType = data.testelement.locatorType;
        let locatorValue =data.testelement.locatorValue;
        let textboxlement = await new uiElement(locatorType,locatorValue);
        await textboxlement.EnterText("Test");
        await BrowserDriver.keyEnter();
    })

});