const fs=require('fs');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

function loadJSON(doc) {   
	return JSON.parse(fs.readFileSync(doc));
};

const username = encodeURIComponent("<username>"); // user you've created before
const password = encodeURIComponent("<password>"); // password you've created before
const mongoUrl = "<ip>:<port>"; // ip and port 
const database = "<database>";
const authMechanism = "DEFAULT";


const uri =
  `mongodb://${username}:${password}@${mongoUrl}/?authMechanism=${authMechanism}&authSource=${database}`;


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
	var users = loadJSON('./users.json');
    	const resultUsers = await client.db(`${database}`).collection('users').insertMany(users);
    	console.dir(resultUsers.insertedCount);
   	var wordlist = loadJSON('./wordlist.json');
    	const resultWordlist = await client.db(`${database}`).collection('wordlist').insertMany(wordlist);
    	console.dir(resultWordlist.insertedCount);
   } finally {
    await client.close();
  }
}
run().catch((error)=>{
	console.dir(error);
	});

