//https://reqres.in/api/users?page=2

const axios = require('axios')
import https from 'https';
import { Logger} from '../index';


export class serviceUtil  {

    public getResponse(options : {}): Promise<any> {
        let response;
        let get = new Promise<any>(async (resolve,reject)=> {
            try{
               response = await axios(options);
                resolve(response);
            } catch(error){
                reject(`Error while connecting to DB error : ${error}`)
                Logger.error(`Error while connecting to DB error: ${error}`)
            }
         });
         return get;
    }

    public generateToken(hostUrl : String, username : String, password :String, client_id: String, client_secret: string): Promise<String> {
        let finalToken;
        let getToken = new Promise<any>(async (resolve,reject)=> {
            try{
                let post_data = {
                    "grant_type": "client_credentials",
                    "username": username,
                    "password": password,
                    "client_id": client_id,
                    "client_secret": client_secret
                }
    
                //// DO NOT DO THIS IF SHARING PRIVATE DATA WITH SERVICE
                //https://stackoverflow.com/questions/51363855/how-to-configure-axios-to-use-ssl-certificate
                const agent = new https.Agent({
                    rejectUnauthorized: false
                });
    
                const response = await axios({
                    method: 'post',
                    // verify: false,
                    url: hostUrl + ":443/auth/oauth/v0/token",
                    // withCredentials: true,
                    httpsAgent: agent,
                    data: Object.keys(post_data).map(function (key) { return encodeURIComponent(key) + '=' + encodeURIComponent(post_data[key]) }).join('&'),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    }
                });
                console.log('response.data.access_token = ',await response.data.access_token)
                finalToken = await response.data.access_token;
                resolve(finalToken);
            } catch(error){
                reject(`Error while connecting to DB error : ${error}`)
                Logger.error(`Error while connecting to DB error: ${error}`)
            }
         });
         return getToken;
    }


    //This is for testing purpose of token
    public getPostResponse(url : string, access_token : string , payload: {}): Promise<any> {
        let get = new Promise<any>(async (resolve,reject)=> {
            try{
                var headers = {
                    'Authorization': "Bearer " + access_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };
    
                const response = await axios({
                    method: 'post',
                    url: url,
                    data: payload,
                    headers: headers
                });
            
                resolve(await response)
            } catch(error){
                reject(`Error while connecting to DB error : ${error}`)
                Logger.error(`Error while connecting to DB error: ${error}`)
            }
         });
         return get;
    }
  


    //This is for testing purpose of token
    public getObssCookie(url : string, access_token : string , payload: {}): Promise<any> {
        let get = new Promise<any>(async (resolve,reject)=> {
            try{
                var headers = {
                    'Authorization': "Bearer " + access_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };
    
                const response = await axios({
                    method: 'get',
                    url: url,
                    // withCredentials: true,
                    headers: headers,
                });
    
                // console.log('RES COKKIE', response.cookies)
                // console.log('RES HEADERS', response.headers)
    
                const cookie = response.headers["set-cookie"][0];
                // console.log('cookie 111::', cookie)
    
                console.log('cookie 222::', cookie.split(';')[0])
    
                let requestHeaderCookie = cookie.split(';')[0];
                resolve(await requestHeaderCookie);
            } catch(error){
                reject(`Error while connecting to DB error : ${error}`)
                Logger.error(`Error while connecting to DB error: ${error}`)
            }
         });
         return get;
    }

}
