const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {
    Query: {
      users: async () => {
        return await User.find({})
      },

      user: async (parent, args) => {
        return await User.findById(args.id)
      },

      me: async (parent, args, context) => {
        if (context.user) {
            return User.findById(context.user._id)
        }
        throw new AuthenticationError("You need to be logged in!");
      },

    },
    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
  
        return { token, user };
      },

      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
            // Change to 'Incorrect credentials' after testing
          throw new AuthenticationError('Incorrect user');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
            // Change to 'Incorrect credentials' after testing
          throw new AuthenticationError('Incorrect password');
        }
  
        const token = signToken(user);
  
        return { token, user };
      }
    }
  };
  
  module.exports = resolvers;
  