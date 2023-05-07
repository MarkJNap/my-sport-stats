import { gql } from '@apollo/client';

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
                minutes
                rebounds
                assists
                steals
                turnovers
                threePointMade
                fouls
                sport {
                    _id
                    name
                }
            }
        }
    }
`

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
                minutes
                rebounds
                assists
                steals
                turnovers
                threePointMade
                fouls
                sport {
                    _id
                    name
                }
            }
        }
    }
`

export const QUERY_STATS = gql`
    query getAllStats {
        stats {
            _id
            creationDate
            totalPoints
            minutes
            rebounds
            assists
            steals
            turnovers
            threePointMade
            fouls
            sport {
                _id
                name
            }
        }
    }
`