var dotEnv = require('dotenv');


result = dotEnv().config();

if (result.error){
	throw result.error 
} 

console.log(result.parsed)

