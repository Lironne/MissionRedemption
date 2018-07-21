var FitBitApiCLient = require("fitbit-node")
var express = require('express')
var result = require('dotenv').config();

const app = express(); 

if (result.error){
	throw result.error 
} 

console.log({clientId: process.env.clientId, clientSecret:process.env.clientSecret})
const client = new FitBitApiCLient({clientId: process.env.clientId, clientSecret:process.env.clientSecret, apiVersion: "1.2"}) 


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
	console.log("the response is" )
	console.log(res)
	// exchange the authorization code we just received for an access token
	client.getAccessToken(req.query.code, 'http://localhost:3000/callback').then(result => {
		console.log("getting resultant data and returning a result")
		console.log(result)
		client.get("/profile.json", result.access_token).then(results => {
			res.send(results)
			console.log("gettubg rykts from profile json")
			console.log(results)
			console.log("\n")
		}) .catch(err => {ß
			res.status(err.status).send(err);
		});
	}).catch(err => {
		res.status(err.status).send(err);
	});
});

app.get("/usersData", (req, res ) =>  {
	res.send(req.params)
	.catch(err => {
	res.status(eerr.status) 
	console.log(res)
});
}) 


app.listen(3000);
