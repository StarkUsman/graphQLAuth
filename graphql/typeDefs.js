const { gql } = require('graphql-tag');

const typeDefs = gql`
    scalar JSON

    type User {
        id: ID!
        userName: String
        email: String
        attributes: JSON
    }

    type UserAuth {
        userName: String
        email: String
        password: String
        token: String
    }

    input registerInput {
        userName: String
        email: String
        password: String
    }

    input loginInput {
        email: String
        password: String
    }
    
    type Message {
        id: ID!
        text: String
        createdBy: String
        createdAt: String
    }

    type Query {
        getUser(id: ID!): User
        getUsers: [User]
        
        getMessage(id: ID!): Message
        getMessages: [Message]
        
        getUserAuth(id: ID!): UserAuth

    }

    type Mutation {
        addUser(userName: String!, email: String, attributes: JSON): User
        updateUser(id: ID!, userName: String, email: String, attributes: JSON): User
        
        createMessage( text: String!, createdBy: String! ): Message
        updateMessage( id: ID!, text: String, createdBy: String ): Message
        
        registerUserAuth(registerInput: registerInput): UserAuth
        loginUserAuth(loginInput: loginInput): UserAuth
    }

`;

module.exports = typeDefs;