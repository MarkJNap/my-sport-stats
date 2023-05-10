const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Sports {
    _id: ID
    name: String!
  }

  type Stats {
    _id: ID
    creationDate: String!
    totalPoints: String
    rebounds: String
    assists: String
    steals: String
    turnovers: String
    fouls: String
    goals: String
    behinds: String
    disposals: String
    tackles: String
    marks: String
    kicks: String
    runs: String
    ballsFaced: String
    sixes: String
    overs: String
    wickets: String
    runsGiven: String
    userId: User
    sports: Sports
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
    sports: [Sports]
    sport(name: String!): Sports

  }

  input addStatsInput {
    totalPoints: String
    rebounds: String
    assists: String
    steals: String
    turnovers: String
    fouls: String
    goals: String
    behinds: String
    disposals: String
    tackles: String
    marks: String
    kicks: String
    runs: String
    ballsFaced: String
    sixes: String
    overs: String
    wickets: String
    runsGiven: String
    userId: String
    sports: String
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    newStats(input: addStatsInput!): Stats
    deleteStats(statsId: ID!): Stats
  }

`
module.exports = typeDefs;