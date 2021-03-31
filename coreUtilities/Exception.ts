import {Logger} from '../index'

export class Exception extends Error {
   public message: string;
   constructor(message : string){
     super(message);
      this.message = message;

      if(typeof console !== undefined){
         Logger.error('Error: ' + this.message)
      }
   }


  
}
