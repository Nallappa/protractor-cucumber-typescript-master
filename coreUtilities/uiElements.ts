
import { element, by ,ElementFinder, browser, ExpectedConditions, ElementArrayFinder} from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { isNullOrUndefined } from 'util';
import {Logger, BrowserDriver} from '../index'

export class uiElements {

    private locatorname; 
    private locatorvalue; 

    constructor(locatorname:string, locatorvalue: string) {
        this.locatorname = locatorname;
        this.locatorvalue = locatorvalue;
    }

    // private xpathElement(): Promise<ElementArrayFinder> {
    //     let finalElement : ElementArrayFinder;
    //     let Element = new Promise<ElementArrayFinder>( (resolve,reject)=> {
    //        try{
    //             let finalElement =  element.all(by.xpath(this.locatorvalue));
    //             resolve(finalElement);
    //        } catch(error){
    //          reject(`Error while forming the element with xpath ${this.locatorvalue}`)
    //        }
    //     });
    //     return Element;
    //  }
     private xpathElement(): ElementArrayFinder {
           try{
                let finalElement =  element.all(by.xpath(this.locatorvalue));
                return finalElement;
           } catch(error){
            console.log('error: ' +error)
           }
     }

     private idElement(): ElementArrayFinder {
        try{
             let finalElement =  element.all(by.id(this.locatorvalue));
             return finalElement;
        } catch(error){
         console.log('error: ' +error)
        }
  }
    

  private cssElement(): ElementArrayFinder {
    try{
         let finalElement =  element.all(by.css(this.locatorvalue));
         return finalElement;
    } catch(error){
     console.log('error: ' +error)
    }
}
 
private linkTextElement(): ElementArrayFinder {
    try{
         let finalElement =  element.all(by.linkText(this.locatorvalue));
         return finalElement;
    } catch(error){
     console.log('error: ' +error)
    }
}

private bindigElement(): ElementArrayFinder {
    try{
         let finalElement =  element.all(by.binding(this.locatorvalue));
         return finalElement;
    } catch(error){
     console.log('error: ' +error)
    }
}

private partialLinkTextElement(): ElementArrayFinder {
    try{
         let finalElement =  element.all(by.partialLinkText(this.locatorvalue));
         return finalElement;
    } catch(error){
     console.log('error: ' +error)
    }
}

private ExactbindigElement(): ElementArrayFinder {
    try{
         let finalElement =  element.all(by.exactBinding(this.locatorvalue));
         return finalElement;
    } catch(error){
     console.log('error: ' +error)
    }
}

private repeaterElement(): ElementArrayFinder {
    try{
         let finalElement =  element.all(by.repeater(this.locatorvalue));
         return finalElement;
    } catch(error){
     console.log('error: ' +error)
    }
}


private exactRepeateElement(): ElementArrayFinder {
    try{
         let finalElement =  element.all(by.exactRepeater(this.locatorvalue));
         return finalElement;
    } catch(error){
     console.log('error: ' +error)
    }
}


private partialButtonText(): ElementArrayFinder {
    try{
         let finalElement =  element.all(by.partialButtonText(this.locatorvalue));
         return finalElement;
    } catch(error){
     console.log('error: ' +error)
    }
}

private ButtonTextElement(): ElementArrayFinder {
    try{
         let finalElement =  element.all(by.buttonText(this.locatorvalue));
         return finalElement;
    } catch(error){
     console.log('error: ' +error)
    }
}

private modelElement(): ElementArrayFinder {
    try{
         let finalElement =  element.all(by.model(this.locatorvalue));
         return finalElement;
    } catch(error){
     console.log('error: ' +error)
    }
}

private classNameElement(): ElementArrayFinder {
    try{
         let finalElement =  element.all(by.className(this.locatorvalue));
         return finalElement;
    } catch(error){
     console.log('error: ' +error)
    }
}

    public getWebElement(): ElementArrayFinder {
        let finalElement : ElementArrayFinder;
        try {
            if( this.locatorname == "xpath" ){
                finalElement =  this.xpathElement();
            }
            if( this.locatorname == "id" ){
                finalElement =  this.idElement();
            }
            else if( this.locatorname == "css" ){
                finalElement =   this.cssElement();
            }
            else if( this.locatorname == "linkText" ){
                finalElement =  this.linkTextElement();
            }
            else if( this.locatorname == "partialLinkText" ){
                finalElement =   this.partialLinkTextElement();
            }
            else if( this.locatorname == "bindig" ){
                finalElement =   this.bindigElement();
            }
            else if( this.locatorname == "exactBinding" ){
                finalElement =  this.ExactbindigElement();
            }
            else if( this.locatorname == "repeater" ){
                finalElement =   this.repeaterElement();
            }
            else if( this.locatorname == "exactRepeater" ){
                finalElement =   this.exactRepeateElement();
            }
            else if( this.locatorname == "partialButtonText" ){
                finalElement =  this.partialButtonText();
            }
            else if( this.locatorname == "buttonText" ){
                finalElement =  this.ButtonTextElement();
            }
            else if( this.locatorname == "class" ){
                finalElement =   this.classNameElement();
            }
            else if( this.locatorname == "model" ){
                finalElement =   this.modelElement();
            }
            else{
                console.log("Please check the locator type or locator value")
            }

        }
        catch (error) {
            Logger.error(`Error while forming the webelement, Error : ${error}`);
        }
       
        return finalElement;
    }
    

    public getTextValues(): Promise<string[]> {
        const textValues : string[] = [];
        let Element = new Promise<string[]>(async (resolve,reject)=> {
           try{
            let ElementsArray = this.getWebElement();
            let count = await ElementsArray.count();
                for(let element of await ElementsArray) {
                    // await element.scrollIntoView();
                    textValues.push( (await element.getText()).trim() );
                }
               resolve(textValues);
           } catch(error){
               Logger.error(`Error while getting the Textvalues of the elementa : Error ${error}`)
               reject(`Error while getting the Textvalues of the elements: Error ${error}`);
           }
        })
        return Element;
     }

     public getattributeValues(attribute : string): Promise<string[]> {
        const textValues : string[] = [];
        let Element = new Promise<string[]>(async (resolve,reject)=> {
           try{
            let ElementsArray = this.getWebElement();
            let count = await ElementsArray.count();
                for(let element of await ElementsArray) {
                    await element.scrollIntoView();
                    textValues.push( (await element.getAttribute(attribute)).trim() );
                }
               resolve(textValues);
           } catch(error){
               Logger.error(`Error while getting the attributevalues of the elementa : Error ${error}`)
               reject(`Error while getting the attributevalues of the elements: Error ${error}`);
           }
        })
        return Element;
     }

     
     public count(): Promise<number> {
        let Element = new Promise<number>(async (resolve,reject)=> {
           try{
            let ElementsArray = this.getWebElement();
            let count = await ElementsArray.count();
               resolve(count);
           } catch(error){
               Logger.error(`Error while getting the count of the elementa : Error ${error}`)
               reject(`Error while getting the count of the elements: Error ${error}`);
           }
        })
        return Element;
     }
     

}
// element(by.buttonText("Bank Manager Login")).click();
// browser.sleep(8000);
// " \"ROM\" "
//  element(by.finalval).getWebElement().click();