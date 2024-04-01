const { CosmosClient } = require("@azure/cosmos");
const { MongoClient } = require("mongodb");

console.log(process.env.CONN_STRING);

const user = encodeURIComponent(process.env.DB_USER);
const pass = encodeURIComponent(process.env.DB_PASS);

const client = new MongoClient(`mongodb://${user}:${pass}@${process.env.DB_HOST}/?ssl=true&retrywrites=false`, {
    connectTimeoutMS: 1000,
});
const db = client.db('movies');

exports.movies = db.collection('movies');
// exports.reviews = db.collection('reviews');
