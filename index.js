const { ApolloServer }  = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const mongo = {
    url: "mongodb://127.0.0.1:27017",
    options: {
        dbName: "graphQLnew",
        appName: "graphQLnew",
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(mongo.url, mongo.options)
    .then(() => {
        console.log("MongoDB Connected");
        return server.listen({port: 5000});
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    });