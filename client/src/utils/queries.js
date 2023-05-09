import { gql } from "@apollo/client";

// users: [User]
// sport: [Sport]

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
        sport {
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
        sport {
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
      userId {
        _id
        username
      }
      sport {
        _id
        name
      }
    }
  }
`;