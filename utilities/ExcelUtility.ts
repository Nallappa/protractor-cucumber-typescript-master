//ts-node test.ts
import { exception } from 'console';
import {isNull, isNullOrUndefined} from 'util';
import {readFile, utils} from 'xlsx';
import {Logger, Exception} from '../index'

export class ExcelUtilities {
   private filPath: string;
   private workBook: any;
   private workSheet: any;
   private sheetId: any;

   constructor(filePath : string, WorkSheet? : string|number){
        this.filPath = filePath;
        this.sheetId = WorkSheet;
   }
   /**
    * @param filPath file location path
    * @param workSheet sheet index or sheet name on which you want to perform, index it will start from 0
    */

    /**
     * Expecting xlsx file extension
     */
     private checkFileExtension(): Promise<void> {
        let checkFileExtension = new Promise<void>(async (resolve,reject)=> {
           try{
              let fileExtension = this.filPath.split('.').pop();
                if( (fileExtension == 'xlsx') || (fileExtension == 'xls') ){
                    resolve();
                }else{
                    throw new Exception(`Invalid fille exception expecting xlsx but got ${fileExtension}`)
                }

           } catch(error){
             reject(`unable to get the file extension for the file path ${this.filPath}`)
           }
        });
        return checkFileExtension;
     }

    /**
     * Expecting xlsx file extension
     */
    private getWorksheet(): Promise<void> {
        let getSheet = new Promise<void>(async (resolve,reject)=> {
           try{
              let sheetName;
              await this.checkFileExtension();
              this.workBook = await readFile(this.filPath);
              this.sheetId = (!(isNullOrUndefined(this.sheetId))) ? this.sheetId : 0;
              typeof this.sheetId === 'number' ?
                sheetName = await this.workBook.SheetNames[this.sheetId] : 
                sheetName = await this.sheetId;
              this.workSheet = await this.workBook.Sheets[sheetName];
              if(isNullOrUndefined(this.workSheet)){
                throw new Exception (`there is no sheet id or sheet name with the name ${this.sheetId}`);
              }
              resolve();
           } catch(error){
             reject(`unable to get the file extension for the file path ${this.filPath}`)
           }
        });
        return getSheet;
     }

    public getSheetRange(): Promise<any> {
        let sheetRange = new Promise<any>(async (resolve,reject)=> {
           try{
                 await this.getWorksheet();
                 if(!(isNullOrUndefined(this.workSheet['!ref']))) {
                    let sheetRange = await utils.decode_range(this.workSheet['!ref']);
                    resolve(sheetRange);
                 }
              resolve(undefined);
           } catch(error){
             reject(`Error while getting the sheet range ${this.sheetId}. Error : ${error} `)
           }
        });
        return sheetRange;
     }

     public getCellValue(columnNumber : number, rowNumber : number): Promise<any> {
        let sheetRange = new Promise<any>(async (resolve,reject)=> {
           try{
                 await this.getWorksheet();
                 let cellValue;
                 let cell = await this.workSheet[utils.encode_cell({r : rowNumber - 1, c:columnNumber - 1})];
                 if(!(isNullOrUndefined(cell))) {
                    cellValue = cell.v;
                 }
              resolve(cellValue);
           } catch(error){
             reject(`Error while getting the cell value of column ${columnNumber} in row  ${rowNumber}. Error : ${error} `)
           }
        });
        return sheetRange;
     }


     public getrowCount(): Promise<number> {
        let rows = new Promise<number>(async (resolve,reject)=> {
           try{
                let sheetRange = await this.getSheetRange();
                 if(!(isNullOrUndefined(sheetRange))) {
                    resolve(sheetRange.e.r + 1);
                 } else {
                     resolve(0);
                 }
           } catch(error){
             reject(`Error while getting the row counts in the sheet ${this.sheetId}. Error : ${error} `)
           }
        });
        return rows;
     }

     
     public getcolumnCount(): Promise<number> {
        let rows = new Promise<number>(async (resolve,reject)=> {
           try{
                let sheetRange = await this.getSheetRange();
                 if(!(isNullOrUndefined(sheetRange))) {
                    resolve(sheetRange.e.c + 1);
                 } else {
                     resolve(0);
                 }
           } catch(error){
             reject(`Error while getting the column counts in the sheet ${this.sheetId}. Error : ${error} `)
           }
        });
        return rows;
     }

     public getRowValues(rowNumber : number): Promise<string[]> {
        let rowValues = new Promise<string []>(async (resolve,reject)=> {
           try{
               let rowValues = [];
                await this.getWorksheet();
                let columnCount = await this.getcolumnCount();
                for(let index = 0; index <= columnCount ; index++ ){
                    let rowValue = this.workSheet[utils.encode_cell({r: rowNumber, c: index})];
                    if(!(isNullOrUndefined(rowValue))){
                        rowValues.push(rowValue.v);
                    }
                }
              resolve(rowValues)
           } catch(error){
            reject(`Error while getting the row values of row no  in the sheet ${rowNumber}. Error : ${error} `);
           }
        });
        return rowValues;
     }

     public getColumnValues(columnNumber : number): Promise<string[]> {
        let columnValue = new Promise<string []>(async (resolve,reject)=> {
           try{
               let ColumnValues = [];
               await this.getWorksheet();
                let rowCount = await this.getrowCount();
                for(let index = 0; index < rowCount ; index++ ){
                    let columnValue = this.workSheet[utils.encode_cell({r: index, c: columnNumber - 1})];
                    if(!(isNullOrUndefined(columnValue))){
                        ColumnValues.push(columnValue.v);
                    }
                }
              resolve(ColumnValues)
           } catch(error){
             reject(`Error while getting the column values of column no  in the sheet ${columnNumber}. Error : ${error} `);
           }
        });
        return columnValue;
     }





}
