var FitBitApiCLient = require("fitbit-node")
var express = require('express')
var superagent = require('superagent');
var result = require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

console.log({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret
})
const client = new FitBitApiCLient({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    apiVersion: "1.2"
})


app.get('/', (req, res) => res.send('Hello World!'))


// redirect the user to the Fitbit authorization page
app.get("/authorize", (req, res) => {
    // request access to the user's activity, heartrate, location, nutrion, profile, settings, sleep, social, and weight scopes
    res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'http://localhost:3000/callback'));
    console.log("This is the result:\n")
    console.log("now doing a callback to get")

});

// handle the callback from the Fitbit authorization flow
app.get("/callback", (req, res) => {
    console.log("performing a get at callback")
    console.log("the req is large; don't console log")
    console.log("the response is")
    // exchange the authorization code we just received for an access token
    client.getAccessToken(req.query.code, 'http://localhost:3000/callback').then(result => {
        const access_token = result.access_token
        console.log("sending back a access_token")
        console.log(result.access_token)
        var accessToken = encodeURIComponent(result.access_token)
        res.redirect("/userHomePage?token=" + accessToken)

        /*
        client.get("/profile.json", result.access_token).then(results => {
        	res.send(results[0])
        	console.log("gettubg rykts from profile json")
        	console.log(results)
        	console.log("\n")
        }) .catch(err => {ß
        	res.status(err.status).send(err);
        	*/
    }).catch(err => {
    res.status(err.status).send(err);
});
});



app.get("/userHomePage", (req, res) => {
    var accessToken = req.query.token;
  //  res.send("hello User this is your token " + req.query.token)
    // going to do two generic queries here
    var heartrate = client.get("/activities/heart/date/2018-06-23/1d/1min.json",req.query.token)
    heartrate.then(results => {
    	res.send(results)
    }).catch(err => {
    	res.status(err.status).send(err);
    });

    var steps = client.get("/activities/steps/date/today/2018-06-23/1d/1min.json",req.query.token)
    steps.then(results => {
    	console.log(results)
    	}).catch(err => {
    		res.status(err.status).send(err)
    	});
    })



app.listen(port);
