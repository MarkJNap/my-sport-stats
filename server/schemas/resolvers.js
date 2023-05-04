const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Stats, Sport } = require('../models');

const resolvers = {
    Query: {
      users: async () => {
        return await User.find({}).populate({
          path: 'stats',
          populate: 'sport'
        })
      },
      
      stats: async () => {
        return await Stats.find({})
      },

      sport: async () => {
        return await Sport.find({})
      },

      user: async (parent, args) => {
        return await User.findById(args.id).populate({
          path: 'stats',
          populate: 'sport'
        })
      },

      me: async (parent, args, context) => {
        if (context.user) {
            return User.findById(context.user._id).populate({
              path: 'stats',
              populate: 'sport'
            })
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
      },
      // TODO: Adjust for context
      addStats: async (parent, args) => {
        await User.findOneAndUpdate(
          { _id: args.userId},
          { $addToSet: { stats: args.input} },
          { new: true}
        )
      },
      // TODO: Adjust for context
      deleteStats: async (parent, args) => {
        await User.findOneAndUpdate(
          {_id: args.userId},
          { $pull: { stats: { _id: args.statsID } } },
          { new: true}
        )
      }
    }
  };
  
  module.exports = resolvers;
  