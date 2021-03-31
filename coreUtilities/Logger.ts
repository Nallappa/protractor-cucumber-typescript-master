import { join } from 'path';
import { createLogger, format, transports} from 'winston';

 const logFolder = join(process.cwd(),'target');
 /**
  * This module is a wrapper over winston logger library
  * it has methods to Log "Error, info, and warnings" 
  */

  export module Logger {
      let logger : any = createLogger ( {
          transports :[
              new transports.Console({}),
              new transports.File({
                  filename : join(logFolder,'execution.log')
              })
          ],
          format : format.combine (
              format.simple(),
              format.colorize({ all : true})
          )
      });
 
      export function error(message : string) {
        logger.error(new Date().toTimeString() + "Message" + message);
        
    }

    export function info(message : string) {
        logger.info(new Date().toTimeString() + "Message" + message);
        
    }
    export function warn(message : string) {
        logger.warn(new Date().toTimeString() + "Message" + message);
        
    }

  }


