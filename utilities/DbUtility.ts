
//https://medium.com/@nomanibrahim7/how-i-can-access-the-database-from-protractor-d03a15df91f3

const mysql = require("mysql"); 
import {Logger} from '../index';
let connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database: 'test'
    });


export class DataBaseUtil  {

    public connectToDb(): Promise<void> {
        let connect = new Promise<void>(async (resolve,reject)=> {
            try{
                await connection.connect();
                resolve();
            } catch(error){
                reject(`Error while connecting to DB error : ${error}`)
                Logger.error(`Error while connecting to DB error: ${error}`)
            }
         });
         return connect;
    }

    public getDbResults(sqlQurey? : string): Promise<any> {
        let getResults = new Promise<any>(async (resolve,reject)=> {
            try{
                let query1 = "SELECT * FROM admin WHERE 1";
                let dboutput = await connection.query(query1);
                resolve(dboutput)
            } catch(error){
                reject(`Error while fetching the details from the db for sqlQurey ${sqlQurey} and Error : ${error}`)
                Logger.error(`Error while fetching the details from the db for sqlQurey ${sqlQurey} and Error : ${error}`)
            }
         });
         return getResults;
    }

    public closeDbConnection(): Promise<void> {
        let closedb = new Promise<void>(async (resolve,reject)=> {
            try{
                await connection.end();
                resolve();
            } catch(error){
                reject(`Error while closing to DB connection error : ${error}`)
                Logger.error(`Error while closing to DB connection error: ${error}`)
            }
         });
         return closedb;
    }
}

    // public Test(): Promise<void> {
    //     let encryptedText = new Promise<void>(async (resolve,reject)=> {
    //         try{
                
    //         let connection = mysql.createConnection({
    //             host : 'localhost',
    //             user : 'root',
    //             password : '',
    //             database: 'test'
    //             });

    //             connection.connect((err) => {
    //                 if(err){
    //                 console.log('Error connecting to Db'); // If there is no connection
    //                 console.log(err); // console the error to debug
    //                 return;
    //             }
    //                 console.log('Connection established'); // If we have a connection
    //             });

    //             // await connection.connect();
    //             var sql = 'SELECT * FROM admin WHERE 1';
    //             // let rows = await connection.query(sql);
    //             // console.log(rows);

    //              connection.query(sql, function (err, rows) {
    //                     if (err) {
    //                     console.log(err); // Print the error if any
    //                     } else {
    //                     let rowsbefore = rows[0].result;
    //                     console.log(rowsbefore); // In the console print the rows
    //                     }
    //             })
    //             await connection.end()
               
    //         } catch(error){
    //             reject(`Error while connecting to DB error : ${error}`)
    //             Logger.error(`Error while connecting to DB error: ${error}`)
    //         }
    //      });
    //      return encryptedText;
    // }