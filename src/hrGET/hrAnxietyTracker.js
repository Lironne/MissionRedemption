var FitBitApiCLient = require("fitbit-node")


// don't push to git 
new FitBitApiCLient({clientId: process.env.clientId, clientSecret:process.env.clientId, apiVersion: "1.2"}) 

getAuthorizeUrl()