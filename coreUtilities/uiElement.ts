
import { element, by ,ElementFinder, browser, ExpectedConditions} from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { isNullOrUndefined } from 'util';
import {Logger} from '../index'

export class uiElement {

    private locatorname; 
    private locatorvalue; 

    constructor(locatorname:string, locatorvalue: string) {
        this.locatorname = locatorname;
        this.locatorvalue = locatorvalue;
    }

    private xpathElement(): Promise<ElementFinder> {
        let finalElement : ElementFinder;
        let Element = new Promise<ElementFinder>(async (resolve,reject)=> {
           try{
                finalElement = await element(by.xpath(this.locatorvalue));
                resolve(finalElement);
           } catch(error){
             reject(`Error while forming the element with xpath ${this.locatorvalue}`)
           }
        });
        return Element;
     }
    

     private idElement(): Promise<ElementFinder> {
        let finalElement : ElementFinder;
        let Element = new Promise<ElementFinder>(async (resolve,reject)=> {
           try{
                finalElement = await element(by.xpath(this.locatorvalue));
                resolve(finalElement);
           } catch(error){
             reject(`Error while forming the element with id ${this.locatorvalue}`)
           }
        });
        return Element;
     }

     private cssElement(): Promise<ElementFinder> {
        let finalElement : ElementFinder;
        let Element = new Promise<ElementFinder>(async (resolve,reject)=> {
           try{
                finalElement = await element(by.css(this.locatorvalue));
                resolve(finalElement);
           } catch(error){
             reject(`Error while forming the element with css ${this.locatorvalue}`)
           }
        });
        return Element;
     }

     
     private linkTextElement(): Promise<ElementFinder> {
        let finalElement : ElementFinder;
        let Element = new Promise<ElementFinder>(async (resolve,reject)=> {
           try{
                finalElement = await element(by.linkText(this.locatorvalue));
                resolve(finalElement);
           } catch(error){
             reject(`Error while forming the element with linkText ${this.locatorvalue}`)
           }
        });
        return Element;
     }

          
     private partialLinkTextElement(): Promise<ElementFinder> {
        let finalElement : ElementFinder;
        let Element = new Promise<ElementFinder>(async (resolve,reject)=> {
           try{
                finalElement = await element(by.partialLinkText(this.locatorvalue));
                resolve(finalElement);
           } catch(error){
             reject(`Error while forming the element with partialLinkText ${this.locatorvalue}`)
           }
        });
        return Element;
     }

     private bindigElement(): Promise<ElementFinder> {
        let finalElement : ElementFinder;
        let Element = new Promise<ElementFinder>(async (resolve,reject)=> {
           try{
                finalElement = await element(by.bindig(this.locatorvalue));
                resolve(finalElement);
           } catch(error){
             reject(`Error while forming the element with bindig ${this.locatorvalue}`)
           }
        });
        return Element;
     }

     private ExactbindigElement(): Promise<ElementFinder> {
        let finalElement : ElementFinder;
        let Element = new Promise<ElementFinder>(async (resolve,reject)=> {
           try{
                finalElement = await element(by.ExactbindigElement(this.locatorvalue));
                resolve(finalElement);
           } catch(error){
             reject(`Error while forming the element with ExactbindigElement ${this.locatorvalue}`)
           }
        });
        return Element;
     }

     private repeaterElement(): Promise<ElementFinder> {
        let finalElement : ElementFinder;
        let Element = new Promise<ElementFinder>(async (resolve,reject)=> {
           try{
                finalElement = await element(by.repeater(this.locatorvalue));
                resolve(finalElement);
           } catch(error){
             reject(`Error while forming the element with repeater ${this.locatorvalue}`)
           }
        });
        return Element;
     }

     private exactRepeateElement(): Promise<ElementFinder> {
        let finalElement : ElementFinder;
        let Element = new Promise<ElementFinder>(async (resolve,reject)=> {
           try{
                finalElement = await element(by.exactRepeater(this.locatorvalue));
                resolve(finalElement);
           } catch(error){
             reject(`Error while forming the element with exactRepeater ${this.locatorvalue}`)
           }
        });
        return Element;
     }

     private partialButtonText(): Promise<ElementFinder> {
        let finalElement : ElementFinder;
        let Element = new Promise<ElementFinder>(async (resolve,reject)=> {
           try{
                finalElement = await element(by.partialButtonText(this.locatorvalue));
                resolve(finalElement);
           } catch(error){
             reject(`Error while forming the element with partialButtonText ${this.locatorvalue}`)
           }
        });
        return Element;
     }

     
     private ButtonTextElement(): Promise<ElementFinder> {
        let finalElement : ElementFinder;
        let Element = new Promise<ElementFinder>(async (resolve,reject)=> {
           try{
                finalElement = await element(by.buttonText(this.locatorvalue));
                resolve(finalElement);
           } catch(error){
             reject(`Error while forming the element with buttonText ${this.locatorvalue}`)
           }
        });
        return Element;
     }

     private classNameElement(): Promise<ElementFinder> {
        let finalElement : ElementFinder;
        let Element = new Promise<ElementFinder>(async (resolve,reject)=> {
           try{
                finalElement = await element(by.className(this.locatorvalue));
                resolve(finalElement);
           } catch(error){
             reject(`Error while forming the element with className ${this.locatorvalue}`)
           }
        });
        return Element;
     }

     private modelElement(): Promise<ElementFinder> {
        let finalElement : ElementFinder;
        let Element = new Promise<ElementFinder>(async (resolve,reject)=> {
           try{
                finalElement = await element(by.model(this.locatorvalue));
                resolve(finalElement);
           } catch(error){
             reject(`Error while forming the element with model ${this.locatorvalue}`)
           }
        });
        return Element;
     }
    

    public getWebElement(): Promise<ElementFinder> {
        let getelement = new Promise<ElementFinder>(async (resolve,reject) => {
        try {
            let finalElement : ElementFinder;
                
            if( this.locatorname == "xpath" ){
                finalElement =  await this.xpathElement();
            }
            if( this.locatorname == "id" ){
                finalElement =  await this.idElement();
            }
            else if( this.locatorname == "css" ){
                finalElement =  await this.cssElement();
            }
            else if( this.locatorname == "linkText" ){
                finalElement =  await this.linkTextElement();
            }
            else if( this.locatorname == "partialLinkText" ){
                finalElement =  await this.partialLinkTextElement();
            }
            else if( this.locatorname == "bindig" ){
                finalElement =  await this.bindigElement();
            }
            else if( this.locatorname == "exactBinding" ){
                finalElement =  await this.ExactbindigElement();
            }
            else if( this.locatorname == "repeater" ){
                finalElement =  await this.repeaterElement();
            }
            else if( this.locatorname == "exactRepeater" ){
                finalElement =  await this.exactRepeateElement();
            }
            else if( this.locatorname == "partialButtonText" ){
                finalElement =  await this.partialButtonText();
            }
            else if( this.locatorname == "buttonText" ){
                finalElement =  await this.ButtonTextElement();
            }
            else if( this.locatorname == "class" ){
                finalElement =  await this.classNameElement();
            }
            else if( this.locatorname == "model" ){
                finalElement =  await this.modelElement();
            }
            else{
                reject("Please check the locator type or locator value")
            }
              
         resolve(finalElement);
        }
        catch (error) {
            Logger.error(`Error while forming the webelement, Error : ${error}`);
            reject('Error while forming the webelement');
        }
        });
        return getelement;
    }
    
    public ClickElement(): Promise<void> {
        let Element = new Promise<void>(async (resolve,reject)=> {
           try{
            let currentElement =  await this.getWebElement();  
                resolve(currentElement.click());
           } catch(error){
             reject(`Error while clicking on webelement and Error is  ${this.locatorvalue}`)
           }
        });
        return Element;
     }

     public EnterText(text : string ): Promise<ElementFinder> {
        let Element = new Promise<ElementFinder>(async (resolve,reject)=> {
           try{
            let currentElement =  await this.getWebElement();
                resolve(await currentElement.sendKeys(text));
           } catch(error){
             reject(`Error while setting the text on webelement ${this.locatorvalue}`)
           }
        });
        return Element;
     }

     public isEnabled(): Promise<boolean> {
      let Element = new Promise<boolean>(async (resolve,reject)=> {
         try{
          let currentElement =  await this.getWebElement();
              resolve(await currentElement.isEnabled());
         } catch(error){
           reject(`Error while fetching the enable property of webelement ${this.locatorvalue}`)
         }
      });
      return Element;
   }

   public isSelected(): Promise<ElementFinder> {
      let Element = new Promise<ElementFinder>(async (resolve,reject)=> {
         try{
          let currentElement =  await this.getWebElement();
              resolve(await currentElement.isSelected());
         } catch(error){
           reject(`Error while fetching is Selected property of webelement ${this.locatorvalue}`)
         }
      });
      return Element;
   }

     public waitTillVisible(opt_timeOut ?: number): Promise<void> {
        opt_timeOut = isNullOrUndefined(opt_timeOut) ? 60000 : opt_timeOut;
        let Element = new Promise<void>(async (resolve,reject)=> {
           try{
               await browser.wait(ExpectedConditions.visibilityOf(await this.getWebElement()),opt_timeOut);
               resolve();
           } catch(error){
               Logger.error(`Error waiting for the element to be present. locator ${this.locatorname} : ${this.locatorvalue} : Error ${error}`)
               reject(`Error waiting for the element to be present. locator ${this.locatorname} : ${this.locatorvalue} : Error ${error}`);
           }
        });
        return Element;
     }

     
     public waitTillTextToBePresent(text: string,opt_timeOut ?: number): Promise<void> {
      opt_timeOut = isNullOrUndefined(opt_timeOut) ? 60000 : opt_timeOut;
      let Element = new Promise<void>(async (resolve,reject)=> {
         try{
             await browser.wait(ExpectedConditions.textToBePresentInElement(await this.getWebElement(),text),opt_timeOut);
             resolve();
         } catch(error){
             Logger.error(`Error waiting for the text to be present. locator ${this.locatorname} : ${this.locatorvalue} : Error ${error}`)
             reject(`Error waiting for the text to be present. locator ${this.locatorname} : ${this.locatorvalue} : Error ${error}`);
         }
      });
      return Element;
   }

 
   public waitTillInVisible(opt_timeOut ?: number): Promise<void> {
      opt_timeOut = isNullOrUndefined(opt_timeOut) ? 60000 : opt_timeOut;
      let Element = new Promise<void>(async (resolve,reject)=> {
         try{
             await browser.wait(ExpectedConditions.invisibilityOf(await this.getWebElement()),opt_timeOut);
             resolve();
         } catch(error){
             Logger.error(`Error waiting for the element to be present. locator ${this.locatorname} : ${this.locatorvalue} : Error ${error}`)
             reject(`Error waiting for the element to be present. locator ${this.locatorname} : ${this.locatorvalue} : Error ${error}`);
         }
      });
      return Element;
   }

   public mouseMove(): Promise<void> {
      let Element = new Promise<void>(async (resolve,reject)=> {
         try{
             await browser.actions().mouseMove(await this.getWebElement()).perform();
             resolve();
         } catch(error){
             Logger.error(`Error while moving the mouse. locator ${this.locatorname} : ${this.locatorvalue} : Error ${error}`)
             reject(`Error while moving the mouse. locator ${this.locatorname} : ${this.locatorvalue} : Error ${error}`);
         }
      });
      return Element;
   }

   
   public waitTillClicable(opt_timeOut ?: number): Promise<void> {
      opt_timeOut = isNullOrUndefined(opt_timeOut) ? 60000 : opt_timeOut;
      let Element = new Promise<void>(async (resolve,reject)=> {
         try{
             await browser.wait(ExpectedConditions.elementToBeClickable(await this.getWebElement()),opt_timeOut);
             resolve();
         } catch(error){
             Logger.error(`Error waiting for the element to be clicable. locator ${this.locatorname} : ${this.locatorvalue} : Error ${error}`)
             reject(`Error waiting for the element to be clicable. locator ${this.locatorname} : ${this.locatorvalue} : Error ${error}`);
         }
      });
      return Element;
   }

     public scrollIntoView(): Promise<void> {
        let Element = new Promise<void>(async (resolve,reject)=> {
           try{
               await browser.executeScript( "arguments[0].scrollIntoView(true)", await this.getWebElement());
               resolve();
           } catch(error){
               Logger.error(`Error while scrolling the element : Error ${error}`)
               reject(`Error while scrolling the element : Error ${error}`);
           }
        });
        return Element;
     }

     public getAttribute(attributeName : string): Promise<string> {
        let Element = new Promise<string>(async (resolve,reject)=> {
           try{
            let attribuElement = await this.getWebElement();
            let attributvalue = await attribuElement.getAttribute(attributeName);
               resolve(attributvalue);
           } catch(error){
               Logger.error(`Error while getting the attribute of the element : Error ${error}`)
               reject(`Error while getting the attribute of the element: Error ${error}`);
           }
        });
        return Element;
     }

     public getText(): Promise<string> {
      let Element = new Promise<string>(async (resolve,reject)=> {
         try{
          let attribuElement = await this.getWebElement();
          let attributvalue = await attribuElement.getText();
             resolve(attributvalue);
         } catch(error){
             Logger.error(`Error while getting the Text of the element : Error ${error}`)
             reject(`Error while getting the Text of the element: Error ${error}`);
         }
      });
      return Element;
   }

     public getCssValue(): Promise<string> {
        let Element = new Promise<string>(async (resolve,reject)=> {
           try{
            let attribuElement = await this.getWebElement();
            let attributvalue = await attribuElement.getCssValue();
               resolve(attributvalue);
           } catch(error){
               Logger.error(`Error while getting the Cssvalue of the element : Error ${error}`)
               reject(`Error while getting the Cssvalue of the element: Error ${error}`);
           }
        });
        return Element;
     }


     public dragAndDrop(sourceElement: ElementFinder, destinationElemment: ElementFinder): Promise<void> {
        let Element = new Promise<void>(async (resolve,reject)=> {
           try{
             await browser.actions().dragAndDrop(sourceElement,destinationElemment).perform();
               resolve();
           } catch(error){
               Logger.error(`Error while drag and drop : Error ${error}`)
               reject(`Error while drag and drop : Error ${error}`);
           }
        });
        return Element;
     }

     public doubleClick(): Promise<void> {
      let Element = new Promise<void>(async (resolve,reject)=> {
         try{
           await browser.actions().doubleClick(await this.getWebElement()).perform();
             resolve();
         } catch(error){
             Logger.error(`Error while double clicking of the element : Error ${error}`)
             reject(`Error while double clicking of the element : Error ${error}`);
         }
      });
      return Element;
   }

   public rightClick(): Promise<void> {
      let Element = new Promise<void>(async (resolve,reject)=> {
         try{
           await browser.actions().click(await this.getWebElement(),protractor.Button.RIGHT).perform();
             resolve();
         } catch(error){
             Logger.error(`Error while double clicking of the element : Error ${error}`)
             reject(`Error while double clicking of the element : Error ${error}`);
         }
      });
      return Element;
   }

   public highlight(): Promise<void> {
      let Element = new Promise<void>(async (resolve,reject)=> {
         try{
            await this.waitTillVisible();
            await browser.executeScript( "arguments[0].setAttribute('style',arguments[1])",await this.getWebElement(),`${await this.getAttribute('style')}; border : 3px solid red;`);
             resolve();
         } catch(error){
             Logger.error(`Error while double highlighting of the element : Error ${error}`)
             reject(`Error while double highlighting of the element : Error ${error}`);
         }
      });
      return Element;
   }


}
