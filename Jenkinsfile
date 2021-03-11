def output
def buildTimeOutInHour = 2

pipeline {

    agent { label 'nodemachineName'}

    options {
        timeout (time : buildTimeOutInHour, unit: 'HOURS')
    }
    tools {
        nodejs 'node'
    }

    environment {
        QaEmailId : "nallappa.45@gmail.com"
        appName: "Test"
        Testresultfoler : ""
    }

    steps {

        stage('CHECKOUT'){
            steps{
                deleteDir()
                echo '${env.JOB_NAME}'
                checkout([$class: 'GITSCM',branch :[[name : "*/${params.branch}"]]]), doGenerateSubModuleConfiguration: false,
                extensions: [],  subModuleCfg:[], credentials : [[credentialsId : 'ssh', url : 'giturl']]])
            }
        } //Checkout

        stage('BUILD'){
            steps{
                  dir('e2e/Test'){
                      bat 'npm i'
                      bat 'npm webdriver-update'
                      bat 'npm run compile'
                  }
            }
        } // Build

        stage('Execute Tests'){
                    steps{
                        dir('e2e/Test'){
                            script {
                                try {
                                    if(params.suites.length() > 0){
                                         bat "npm run test --test:suite${params.suites}"
                                    }else {
                                         bat "npm run test"
                                    }
                               
                                }catch(e){
                                   echo "There are some test failurs"
                                }
                              
                            }
                        }
                      
                    }
                } // Build

    } //Steps
 
   deleteDir()
   cleanWs()

} //pipeline