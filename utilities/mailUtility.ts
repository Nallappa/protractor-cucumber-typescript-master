import { Logger, Exception} from '../index'


export module EmailUtility {

    export async function senEmail(){
                
        var sendmail = require("sendmail")({
            smtpPort: 465, // Default: 25
            smtpHost: "smtp.gmail.com",// Default: -1 - extra smtp host after resolveMX
            tls : {
                rejectUnauthorized : false
            }
            // auth: {
            //     user: "nallappa.4501@gmail.com",
            //     pass: "xxxxx"
            // }
        })

        sendmail( {
            from: 'nallappa.4501@gmail.com', // sender address
            to: 'nalli.4501@gmail.com', // list of receivers
            subject: 'Report for Test Result', // Subject line
            text: 'Contains the test result for the smoke test in html file' // plaintext body
            // attachments: [
            //     {
            //         'filename': 'TestResult.html',
            //         'filePath': './test-results/TestResult.html',
            //     }

            // ]
        },function(error) {
            Logger.error("Error while sending the mail" + error)
            throw new Exception("Error while sending the mail" + error)
        });
            }
}




