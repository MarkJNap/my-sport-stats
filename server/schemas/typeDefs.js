const { gql } = require("apollo-server-express");

const typeDefs = gql`
# The sport stats are just for basketball atm
  type Sport {
    _id: ID
    name: String!
  }

  type Stats {
    _id: ID
    creationDate: String!
    totalPoints: Int
    minutes: String
    rebounds: Int
    assists: Int
    steals: Int
    turnovers: Int
    threePointMade: Int
    fouls: Int
    sport: Sport
  }

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    stats: [Stats]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    me: User
    user(id: ID!): User
    stats: [Stats]
    sport: [Sport]
  }

  input addStatsInput {
    totalPoints: Int
    minutes: String
    rebounds: Int
    assists: Int
    steals: Int
    turnovers: Int
    threePointMade: Int
    fouls: Int
    sport: String
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    newStats(input: addStatsInput): Stats
    deleteStats(statsId: ID!): User
  }

`
module.exports = typeDefs;