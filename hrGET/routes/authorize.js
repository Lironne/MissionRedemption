var express = require('express');
var router = express.Router();

var FitBitApiCLient = require("fitbit-node")
var superagent = require('superagent');
var result = require('dotenv').config();

var config = require('../config.js');

const host = config.hostName;
const callbackRoute = `${host}/authorize/callback`;

console.log({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    host: host,
    callback: callbackRoute
})
const client = new FitBitApiCLient({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    apiVersion: "1.2"
})

// redirect the user to the Fitbit authorization page
router.get("/", (req, res) => {
    // request access to the user's activity, heartrate, location, nutrion, profile, settings, sleep, social, and weight scopes
    res.status(301).redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', callbackRoute));
    console.log("This is the result:\n")
    console.log("now doing a callback to get")
    // res.send(200);

});

router.get("/url", (req, res) => {
  var auth = client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', callbackRoute);
  res.json({ requestedUrl: auth});
});

// handle the callback from the Fitbit authorization flow
router.get("/callback", (req, res) => {
    console.log("performing a get at callback")
    console.log("the req is large; don't console log")
    console.log("the response is")
    res.status(301).redirect("http://localhost:3000/success");
    // exchange the authorization code we just received for an access token
//     client.getAccessToken(req.query.code, callbackRoute).then(result => {
//         const access_token = result.access_token
//         console.log("sending back a access_token")
//         console.log(result.access_token)
//         var accessToken = encodeURIComponent(result.access_token)
//         res.status(301).redirect("/userHomePage?token=" + accessToken)
//
//         /*
//         client.get("/profile.json", result.access_token).then(results => {
//         	res.send(results[0])
//         	console.log("gettubg rykts from profile json")
//         	console.log(results)
//         	console.log("\n")
//         }) .catch(err => {ß
//         	res.status(err.status).send(err);
//         	*/
//     }).catch(err => {
//     res.status(err.status).send(err);
// });
});



router.get("/userHomePage", (req, res) => {
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

module.exports = router;
