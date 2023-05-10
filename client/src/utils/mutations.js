import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_NEWSTATS = gql`
    mutation newStats($input: addStatsInput!) {
        newStats(input: $input) {
                _id
                totalPoints
                rebounds
                assists
                steals
                turnovers
                fouls
                goals
                behinds
                disposals
                tackles
                marks
                kicks
                runs
                ballsFaced
                sixes
                overs
                wickets
                runsGiven
                sports {
                    name
                }
            }
    }
`

export const DELETE_STATS = gql`
    mutation DeleteStats($statsId: ID!) {
        deleteStats(statsId: $statsId) {
            _id
        }
    }
`