import {createWriteStream,readFileSync} from 'fs';
import {commonPageHelper, Logger} from '../index'
import {isNullOrUndefined} from 'util';
import {browser, ExpectedConditions, Key, logging} from 'protractor';
import {join} from 'path';

export module BrowserDriver {


    export function initializeBrowser(): Promise<void> {
        let initialize = new Promise<void>(async (resolve,reject) => {
            try {
                await waitForAngularEnabled(true);
                await deleteAllCookies();
                await setPageLoadTimeout(60000);
                await setImplicitWaitTimeOut(60000);
                await maximize();
                resolve();
            }
            catch (error) {
                Logger.error(`Error Initializing the browser, Error : ${error}`);
                reject('Error Initializing the browser');
            }
        });
        return initialize;
    }

export function closeCurrentWindow(): Promise<void> {
    let closewindow = new Promise<void>(async (resolve,reject) => {
        try {
            await browser.close();
            resolve();
        }
        catch (error) {
            Logger.error(`Failed closing current window, Error : ${error}`);
            reject('Failed closing current window');
        }
    });
    return closewindow;
}


export function closeWindow(handleNameOrIndex : string | number): Promise<void> {
    let closewindow = new Promise<void>(async (resolve,reject) => {
        try {
            await swithchToWindow(handleNameOrIndex);
            await closeCurrentWindow();
            resolve();
        }
        catch (error) {
            Logger.error(`Failed closing current window for handleNameOrIndex ${handleNameOrIndex}, Error : ${error}`);
            reject('Failed closing current window');
        }
    });
    return closewindow;
}

export function swithchToWindow(handleNameOrIndex : string | number): Promise<void> {
    let closewindow = new Promise<void>(async (resolve,reject) => {
        try {
            if(typeof handleNameOrIndex === 'string'){
                await browser.switchTo().window(handleNameOrIndex);
                resolve();
            }else if(typeof handleNameOrIndex === 'number'){
                let getAllWindowHandles = await browser.getAllWindowHandles();
                await browser.switchTo().window(getAllWindowHandles[handleNameOrIndex]);
                resolve();
            } else {
                reject(`Error Switching to windoe with param ${handleNameOrIndex}`)
            }
        }
        catch (error) {
            Logger.error(`Error Switching to windoe with param ${handleNameOrIndex}, Error : ${error}`);
            reject(`Error Switching to windoe with param ${handleNameOrIndex}`);
        }
    });
    return closewindow;
}

export function swithchToFrame(frameIndex : number): Promise<void> {
    let swithFrame = new Promise<void>(async (resolve,reject) => {
        try {
               await browser.switchTo().frame(frameIndex);
               resolve();
        }catch (error) {
            Logger.error(`Error Switching to frame, Error : ${error}`);
            reject(`Error Switching to frame}`);
        }
    });
    return swithFrame;
}

export function swithchToParentContent(frameIndex : number): Promise<void> {
    let swithFrame = new Promise<void>(async (resolve,reject) => {
        try {
               await browser.switchTo().defaultContent();
               resolve();
        }catch (error) {
            Logger.error(`Error Switching to parent content, Error : ${error}`);
            reject(`Error Switching to parent content}`);
        }
    });
    return swithFrame;
}

//Waiting the WaitTillLoadingSpinnerDisappears

export function setImplicitWaitTimeOut(timeOutInMilliSeconds : number): Promise<void> {
    let swithFrame = new Promise<void>(async (resolve,reject) => {
        try {
               await browser.manage().timeouts().implicitlyWait(timeOutInMilliSeconds);
               resolve();
        }catch (error) {
            Logger.error(`Error setting Implicit wait to ${timeOutInMilliSeconds}, Error : ${error}`);
            reject(`Error setting Implicit wait to ${timeOutInMilliSeconds}`);
        }
    });
    return swithFrame;
}

//set timeeout of time out wait for an asynchronous script to finish the execution before retruning the error
export function setScriptsTimeout(timeOutInMilliSeconds : number): Promise<void> {
    let swithFrame = new Promise<void>(async (resolve,reject) => {
        try {
               await browser.manage().timeouts().setScriptTimeout(timeOutInMilliSeconds);
               resolve();
        }catch (error) {
            Logger.error(`Error setting setScriptTimeout wait to ${timeOutInMilliSeconds}, Error : ${error}`);
            reject(`Error setting setScriptTimeout wait to ${timeOutInMilliSeconds}`);
        }
    });
    return swithFrame;
}



export function getAllWindowHanldes(): Promise<string[]> {
    let getWindowHanles = new Promise<string[]>(async (resolve,reject) => {
        try {
           let hanldles = await browser.getAllWindowHandles();
            resolve(hanldles);
        }
        catch (error) {
            Logger.error(`unable to fetch the window handles, Error : ${error}`);
            reject('unable to fetch the window handles');
        }
    });
    return getWindowHanles;
}


export function maximize(): Promise<void> {
    let maximize = new Promise<void>(async (resolve,reject) => {
        try {
            await browser.manage().window().maximize();
            resolve();
        }
        catch (error) {
            Logger.error(`Failed maximize current window, Error : ${error}`);
            reject('Failed maximize current window');
        }

    });
    return maximize;
}


export function deleteAllCookies(): Promise<void> {
    let deleteAllCookies = new Promise<void>(async (resolve,reject) => {
        try {
            await browser.manage().deleteAllCookies();
            resolve();
        }
        catch (error) {
            Logger.error(`Failed while deleting all cookies, Error : ${error}`);
            reject('Failed while deleting all cookies');
        }

    });
    return deleteAllCookies;
}


export function isBrowserFullScreen(): Promise<boolean> {
    let browserMaxixized = new Promise<boolean>(async (resolve,reject) => {
        try {
            let browserStatus = await browser.executeScript( () => {
                return !window.screenTop &&  !window.screenY;
            })
           let fullScreen : boolean = browserStatus === false ? true : false; 
            resolve(fullScreen);
        }
        catch (error) {
            Logger.error(`Error while checking the browser full screen, Error : ${error}`);
            reject('Error while checking the browser full screen');
        }

    });
    return browserMaxixized;
}

export function executeScript(script : string |Function, ...args :any[]): Promise<void> {
    let browserMaxixized = new Promise<void>(async (resolve,reject) => {
        try {
            let browserStatus = await browser.executeScript(script,args)
            resolve();
        }
        catch (error) {
            Logger.error(`Error while executing the script, Error : ${error}`);
            reject('Error while executing the script');
        }

    });
    return browserMaxixized;
}

export function quitSession(script : string |Function, ...args :any[]): Promise<void> {
    let browserMaxixized = new Promise<void>(async (resolve,reject) => {
        try {
            await browser.close();
            resolve();
        }
        catch (error) {
            Logger.error(`Error while closing the browser, Error : ${error}`);
            reject('Error while  closing the browser');
        }

    });
    return browserMaxixized;
}

export function getBrowserConsoleLogs(): Promise<string[]> {
    let logs : string[] = [];
    let consoleErrors = new Promise<string[]>(async (resolve,reject) => {
        try {
           let consolelogs = await browser.manage().logs().get('browser');
           await consolelogs.forEach( (log) => {
               if(log.level === logging.Level.SEVERE) {
                    let logMessage = log.message;
                    logs.push[logMessage];
               }
           })
            resolve(logs);
        }
        catch (error) {
            Logger.error(`Error while fetching the browser console logs, Error : ${error}`);
            reject('Error while fetching the browser console logs');
        }
    });
    return consoleErrors;
}


export function waitForAngularEnabled(enabled? : boolean): Promise<void> {
    let waitforAngular = new Promise<void>(async (resolve,reject) => {
        try {
             await browser.waitForAngularEnabled(enabled);
            resolve();
        }
        catch (error) {
            Logger.error(`Error while setting the wait for angularenabled ${enabled} , Error : ${error}`);
            reject('Error while setting the wait for angularenabled');
        }

    });
    return waitforAngular;
}


export function setPageLoadTimeout(timeOutInMilliSeconds : number): Promise<void> {
    let setPageLoadTime = new Promise<void>(async (resolve,reject) => {
        try {
             await browser.manage().timeouts().pageLoadTimeout(timeOutInMilliSeconds);
            resolve();
        }
        catch (error) {
            Logger.error(`Error while setting the pageLoad Timeout ${timeOutInMilliSeconds} , Error : ${error}`);
            reject('Error while setting the pageLoad Timeout');
        }

    });
    return setPageLoadTime;
}


export function refreshPage(opt_timeOut? : number): Promise<void> {
    let setPageLoadTime = new Promise<void>(async (resolve,reject) => {
        try {
             await browser.refresh(opt_timeOut);
            resolve();
        }
        catch (error) {
            Logger.error(`Error while refreshing the page , Error : ${error}`);
            reject('Error while refreshing the page');
        }

    });
    return setPageLoadTime;
}

/**
 * Resizes the current window with the width and height
 * @param width : desired window width.
 * @param height : desired window height.
 */

export function setWindowSize(width: number, height : number): Promise<void> {
    let setPageLoadTime = new Promise<void>(async (resolve,reject) => {
        try {
            await  browser.manage().window().setSize(width, height);
            resolve();
        }
        catch (error) {
            Logger.error(`Error while setting the window size with width ${width} and height ${height} , Error : ${error}`);
            reject(`Error while setting the window size with width ${width} and height ${height}`);
        }

    });
    return setPageLoadTime;
}


export function acceptAlert(): Promise<void> {
    let acceptAlert = new Promise<void>(async (resolve,reject) => {
        try {
            await browser.switchTo().alert().accept();
            resolve();
        }catch (error) {
            Logger.error(`Error while accepting the alert, Error : ${error}`);
            reject('Error while accepting the alert');
        }
    });
    return acceptAlert;
}


export function switchToAlert(): Promise<void> {
    let acceptAlert = new Promise<void>(async (resolve,reject) => {
        try {
            await browser.switchTo().alert();
            resolve();
        }catch (error) {
            Logger.error(`Error while switching to alert, Error : ${error}`);
            reject('Error while switching to alert');
        }
    });
    return acceptAlert;
}

/**
 * Navigating to url
 * @param url :Destination url
 * @param opt_timeOut : No of milliseconds to wait for angular to start
 */
export function navigateTo(url: string, opt_timeOut?: number): Promise<void> {
    let acceptAlert = new Promise<void>(async (resolve,reject) => {
        try {
            await browser.get(url,opt_timeOut)
            resolve();
        }catch (error) {
            Logger.error(`Error while navigating to url ${url}, Error : ${error}`);
            reject(`Error while navigating to url ${url}`);
        }
    });
    return acceptAlert;
}


export function waitForAlert(opt_TimeOut?: number): Promise<void> {
    let alertWait = new Promise<void>(async (resolve,reject) => {
        try {
            opt_TimeOut = isNullOrUndefined(opt_TimeOut) ? 6000 : opt_TimeOut;
            await browser.wait(ExpectedConditions.alertIsPresent(),opt_TimeOut);
            resolve();
        }catch (error) {
            Logger.error(`Error while waiting for the alert, Error : ${error}`);
            reject('Error while waiting for the alert');
        }
    });
    return alertWait;
}

export function dismissAlert(): Promise<void> {
    let dismissAlert = new Promise<void>(async (resolve,reject) => {
        try {
            await browser.switchTo().alert().dismiss();
            resolve();
        }catch (error) {
            Logger.error(`Error while dismissing the alert, Error : ${error}`);
            reject('Error while dismissing the alert');
        }
    });
    return dismissAlert;
}

export function waitforAngular(opt_description : string): Promise<void> {
    let dismissAlert = new Promise<void>(async (resolve,reject) => {
        try {
            await browser.waitForAngular(opt_description);
            resolve();
        }catch (error) {
            Logger.error(`Error while waiting for angular to finish the rendering, Error : ${error}`);
            reject('Error while waiting for angular to finish the rendering');
        }
    });
    return dismissAlert;
}

export function keyEscape(): Promise<void> {
    let dismissAlert = new Promise<void>(async (resolve,reject) => {
        try {
            await browser.actions().sendKeys(Key.ESCAPE).perform();
            resolve();
        }catch (error) {
            Logger.error(`Error while pressing the escape key, Error : ${error}`);
            reject('Error while pressing the escape key');
        }
    });
    return dismissAlert;
}

export function keyEnter(): Promise<void> {
    let dismissAlert = new Promise<void>(async (resolve,reject) => {
        try {
            await browser.actions().sendKeys(Key.ENTER).perform();
            resolve();
        }catch (error) {
            Logger.error(`Error while pressing the Enter key, Error : ${error}`);
            reject('Error while pressing the Enter key');
        }
    });
    return dismissAlert;
}






}


