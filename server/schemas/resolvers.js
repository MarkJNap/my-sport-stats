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
      newStats: async (parent, args, context) => {
        if (context.user) {
          const newStats = await Stats.create(args.input)
          console.log(newStats);
          return await User.findByIdAndUpdate(context.user._id,
            { $addToSet: { stats: { _id: newStats._id } } },
            { new: true })
        }
        throw new AuthenticationError('Not logged in');
      },
      // TODO: Adjust to delete better
      deleteStats: async (parent, args, context) => {
        if (context.user) {
          return await Stats.findByIdAndDelete(args.statsId)
          // TODO: Finish deleting the stats
          // return await User.findByIdAndUpdate(context.user._id,
          //   { $pull: { stats: args.statsId } },
          //   { new: true},
          //   console.log(args),
          //   console.log(args.statsId)
          // )
        }
        throw new AuthenticationError('Not logged in');
      }
    }
  };
  
  module.exports = resolvers;
  

// Example for handling delete
  // deleteVideo(req, res) {
  //   Video.findOneAndRemove({ _id: req.params.videoId })
  //     .then((video) =>
  //       !video
  //         ? res.status(404).json({ message: 'No video with this id!' })
  //         : User.findOneAndUpdate(
  //             { videos: req.params.videoId },
  //             { $pull: { videos: req.params.videoId } },
  //             { new: true }
  //           )
  //     )
  //     .then((user) =>
  //       !user
  //         ? res
  //             .status(404)
  //             .json({ message: 'Video created but no user with this id!' })
  //         : res.json({ message: 'Video successfully deleted!' })
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },