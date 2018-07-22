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
    return res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'http://localhost:3000/callback'))
    console.log("This is the result:\n")
    console.log("now doing a callback to get")

});

// handle the callback from the Fitbit authorization flow
app.get("/callback", (req, res) => {
    // exchange the authorization code we just received for an access token
    client.getAccessToken(req.query.code, 'http://localhost:3000/callback').then(result => {
        const access_token = result.access_token
        var accessToken = encodeURIComponent(result.access_token)
        return res.redirect("/userHomePage?token=" + accessToken)
    }).catch(err => {
    	console.log(err)
});
});



app.get("/userHomePage", (req, res) => {
	console.log(req.query.token)
    var accessToken = req.query.token;
    var data;    
    client.get("/activities/heart/date/2018-06-30/1d/1min.json", req.query.token).then(results => {
    	return res.send(results)
    	console.log("in here")
    	client.get("/activities/steps/date/2018-06-30/1d/1min.json",req.query.token).then(results => {
    	return res.send(results)
    	}).catch(err => {
     		console.log("hitting an error")
     		console.log(err)
    	 	return res.status(err.status).send(err)
    	});
    }).catch(err => {
    	return res.status(err.status).send(err);
    });
 });



app.listen(port);
