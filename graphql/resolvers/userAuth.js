const UserAuth = require('../../models/userAuth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userAuthResolvers = {
    Query: {
        getUserAuth: async (_, { id }) => await UserAuth.findById(id)
        },

    Mutation: {        
        async registerUserAuth(_, { registerInput: { userName, email, password } }) {
            const oldUser = await UserAuth.findOne({ email });
            if (oldUser) {
                throw new Error('User already exists for given email ', email, 'USER_ALREADY_EXISTS');
            }
            const encryptedPassword = await bcrypt.hash(password, 12);
            const newUser = new UserAuth({
                userName: userName,
                email: email.toLowerCase(),
                password: encryptedPassword
            });

            const token = jwt.sign(
                { userId: newUser._id, email: newUser.email },
                // process.env.JWT_SECRET,
                'KEY_TO_BE_IMPORTED_FROM_ENV',
                { expiresIn: '1h' }
            );

            newUser.token = token;

            const res = await newUser.save();
            return {
                id: res._id,
                ...res._doc
            };
        },
        async loginUserAuth(_, { loginInput: { email, password } }) {
            const user = await UserAuth.findOne({ email });
            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign(
                    { userId: user._id, email: user.email },
                    // process.env.JWT_SECRET,
                    'KEY_TO_BE_IMPORTED_FROM_ENV',
                    { expiresIn: '1h' }
                );
                user.token = token;
                return {
                    id: user._id,
                    ...user._doc
                };
            } else {
                throw new Error('Invalid credentials');
            }
        }
    }

};

module.exports = userAuthResolvers ;