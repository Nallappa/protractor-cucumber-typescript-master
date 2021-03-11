
  const fs = require('fs');
import { browser } from 'protractor';
const using = require('jasmine-data-provider');
  import { BrowserDriver, uiElement, uiElements,DataBaseUtil,Logger,serviceUtil} from '../index';
  const data = JSON.parse(fs.readFileSync('test-data\\test-data.json'));
  const data1 = JSON.parse(fs.readFileSync('locators\\sample_locator.json'));
  const dbObject =new DataBaseUtil();
  const serObject = new serviceUtil();

beforeAll( async() => {
    await BrowserDriver.navigateTo(data.url);
});
 
describe('JSON File Operation Tests: ', () => {

    xit('As a user I can read data from JSON file', async function () {

    //Testing uiElement
        let textboxlement = await new uiElement(data1.testelement.locatorType,data1.testelement.locatorValue);
        await textboxlement.waitTillVisible(5000);
        await textboxlement.EnterText('2');
    //Testing uiElement
        let textboxlements = await new uiElements(data1.testelement1.locatorType,data1.testelement1.locatorValue);
        let values = await textboxlements.getTextValues();
        let count = await textboxlements.count();
        Logger.info(`The values are ${values}`);
        Logger.info(`The count is ${count}`);
    //Testing dbConnection
    Logger.info(`Db Connection Starts}`);
         await dbObject.connectToDb();
         let dbresults = await dbObject.getDbResults();
         Logger.info(`The db results are ${dbresults}`);
         await dbObject.closeDbConnection();
    })
    
    xit('Testing Webservices', async function () {
      //Get
      console.log(browser.params.login.user);
      console.log(browser.params.login.password);
     let response =  await serObject.getResponse(data.options);
     console.log(await response.status);
     console.log(await response.data);
    //  //Post
     let responsepost =  await serObject.getResponse(data.optionspost);
     console.log(await responsepost.status);
     console.log(await responsepost.data);
    //Post
      let responseput =  await serObject.getResponse(data.optionsput);
      console.log(await responseput);
      console.log(await responseput.status);
      console.log(await responseput.data);
    });

    using(["Nali","Pavi","Amma"],function(data){
      fit('Testing Dataprovider', async function () {
        //Get
        console.log(data);
      });
    })



});