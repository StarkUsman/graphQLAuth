const messageAndUserResolvers = require('./user&Message');
const userAuthResolvers = require('./userAuth');

const resolvers = {
    Query: {
        ...messageAndUserResolvers.Query,
        ...userAuthResolvers.Query
    },
    Mutation: {
        ...messageAndUserResolvers.Mutation,
        ...userAuthResolvers.Mutation
    }
};

module.exports = resolvers;
