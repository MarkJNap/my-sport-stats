import { gql } from "@apollo/client";

// users: [User]

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      stats {
        _id
        creationDate
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
        userId {
        _id
        }
        sports {
          _id
          name
        }
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(id: $userId) {
      _id
      username
      email
      stats {
        _id
        creationDate
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
        userId {
        _id
        username
        }
        sports {
          _id
          name
        }
      }
    }
  }
`;

export const QUERY_STATS = gql`
  query stats {
    stats {
      _id
      creationDate
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
      userId {
        _id
        username
      }
      sports {
        _id
        name
      }
    }
  }
`;

export const QUERY_SPORT = gql`
  query sport($name: String!) {
    sport(name: $name) {
    _id
    name
    }
  }
`