var FitBitApiCLient = require("fitbit-node")
var express = require('express')
var superagent = require('superagent');
var result = require('dotenv').config();

const app = express();

if (result.error) {
    throw result.error
}

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
    // exchange the authorization code we just received for an access token
    client.getAccessToken(req.query.code, 'http://localhost:3000/callback').then(result => {
        const access_token = result.access_token
        var accessToken = encodeURIComponent(result.access_token)
        res.redirect("/userHomePage?token=" + accessToken)
    }).catch(err => {
    res.status(err.status).send(err);
});
});



app.get("/userHomePage", (req, res) => {
    var accessToken = req.query.token;
    // going to do two generic queries here
    /*
    var heartrate = client.get("/activities/heart/date/2018-06-23/1d/1min.json",req.query.token)
    var data;
    heartrate.then(results => {
    	data[hr] = {results}
    }).catch(err => {
    	res.status(err.status).send(err);
    });
*/
    var steps = client.get("/activities/steps/date/today/2018-06-23/1d/1min.json",req.query.token)
    steps.then(results => {
    	data[steps] = {results}
        	}).catch(err => {
    		res.status(err.status).send(err)
    	});
        	res.send(data)
    })



app.listen(3000);
