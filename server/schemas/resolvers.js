const { AuthenticationError } = require('apollo-server-express');
const { User} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent,{ username }) => {
      return User.findOne({ username }).populate('savedBooks');
    },

    user: async (parent,{ id }) => {
      return User.findOne({ id }).populate('savedBooks');
    },
  },



  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { userId}, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId},
          {
            $addToSet: {
              savedBooks: { authors, description, bookId, image, link, title },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    deleteBook: async (parent, {userId, booksavedId}, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId},
          {
            $pull: {
              savedBooks: {
                _id: booksavedId},
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
