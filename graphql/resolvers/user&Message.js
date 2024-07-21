const { User, Message } = require('../../models/models');
const { GraphQLJSON } = require('graphql-type-json');

const messageAndUserResolvers = {
    JSON: GraphQLJSON,

    Query: {
        getUser: async (_, { id }) => await User.findById(id),
        getUsers: async () => await User.find({}),
        getMessage: async (_, { id }) => await Message.findById(id),
        getMessages: async () => await Message.find({})
    },

    Mutation: {        
        addUser: async (_, { userName, email, attributes }) => {
            try {
                let response = await User.create({ userName, email, attributes });
                return response;
            } catch (e) {
                throw new Error(e.message);
            }
        },
        updateUser: async (_, { id, userName, email, attributes }) => {
            try {
                let response = await User.findByIdAndUpdate(id, { userName, email, attributes }, { new: true });
                return response;
            } catch (e) {
                throw new Error(e.message);
            }
        },
        createMessage: async (_, { text, createdBy }) => {
            try {
                const newMessage = await Message.create({ text, createdBy, createdAt: new Date().toISOString() });
                return newMessage;
            } catch (e) {
                throw new Error(e.message);
            }
        },
        updateMessage: async (_, { id, text, createdBy }) => {
            try {
                let response = await Message.findByIdAndUpdate(id, { text, createdBy }, { new: true });
                return response;
            } catch (e) {
                throw new Error(e.message);
            }
        }
    }
};

module.exports = messageAndUserResolvers;