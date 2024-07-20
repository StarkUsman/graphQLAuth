const express = require('express');
const mongoose = require('mongoose');
const { createHandler } = require('graphql-http/lib/use/express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers/resolvers');
const config = require('./config/config');

const app = express();

mongoose.connect(config.mongo.url, config.mongo.options).then(() => {
    console.log("MongoDB Connected to ", config.mongo.url);
    }).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

app.use('/graphql', createHandler({ schema }));

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000/graphql');
})