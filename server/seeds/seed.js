const db = require("../config/connection");
const { User, Stats, Sports } = require("../models/");

db.once("open", async () => {
    try {
        await Sports.deleteMany()
        const sports = await Sports.insertMany([
            { name: "Basketball"},
            { name: "AFL"},
            { name: "Cricket"}
        ])
        console.log("Sports Seeded");

        await Stats.deleteMany()
        const stats = await Stats.insertMany([
            {
                creationDate: 1683561600000,
                totalPoints: 12,
                rebounds: 5,
                assists: 4,
                steals: 1,
                turnovers: 3,
                fouls: 2,
                userId: null,
                sports: sports[0]._id
            },
            {
                creationDate: 1683561600000,
                totalPoints: 14,
                rebounds: 3,
                assists: 5,
                steals: 2,
                turnovers: 4,
                fouls: 4,
                userId: null,
                sports: sports[0]._id
            },
            {
                creationDate: 1683561600000,
                totalPoints: 21,
                rebounds: 11,
                assists: 1,
                steals: 0,
                turnovers: 4,
                fouls: 4,
                userId: null,
                sports: sports[0]._id
            },

            {
                creationDate: 1683648000000,
                goals: 3,
                behinds: 1,
                disposals: 21,
                tackles: 4,
                marks: 4,
                kicks: 7,
                userId: null,
                sports: sports[1]._id
            },
            {
                creationDate: 1683648000000,
                goals: 1,
                behinds: 5,
                disposals: 25,
                tackles: 0,
                marks: 2,
                kicks: 8,
                userId: null,
                sports: sports[1]._id
            },
            {
                creationDate: 1683648000000,
                goals: 1,
                behinds: 0,
                disposals: 14,
                tackles: 0,
                marks: 1,
                kicks: 6,
                userId: null,
                sports: sports[1]._id
            },

            {
                creationDate: 1683734400000,
                runs: 42,
                ballsFaced: 20,
                sixes: 3,
                overs: 0,
                wickets: 0,
                runsGiven: 0,
                userId: null,
                sports: sports[2]._id
            },            
            {
                creationDate: 1683734400000,
                runs: 25,
                ballsFaced: 32,
                sixes: 1,
                overs: 3,
                wickets: 1,
                runsGiven: 24,
                userId: null,
                sports: sports[2]._id
            },            
            {
                creationDate: 1683734400000,
                runs: 0,
                ballsFaced: 1,
                sixes: 0,
                overs: 4,
                wickets: 3,
                runsGiven: 30,
                userId: null,
                sports: sports[2]._id
            },
        ])
        console.log("Stats Seeded");

        await User.deleteMany()
        const users = await User.create([
            {
                username: "Mark",
                email: "mark@test.com",
                password: "password1",
                stats: [stats[0]._id, stats[1]._id]
            },
            {
                username: "James",
                email: "james@test.com",
                password: "password1",
                stats: [stats[2]._id, stats[3]._id, stats[4]._id]
            },
            {
                username: "Frank",
                email: "frank@test.com",
                password: "password1",
                stats: [stats[5]._id, stats[6]._id, stats[7]._id, stats[8]._id]
            }
        ])
        console.log("Users Seeded");

        if (users) {
            const mark = await User.findOne({
                username: "Mark"
            })
            await Stats.findOneAndUpdate( 
                { _id: mark.stats[0] },
                { $set: {
                    userId: mark._id
                }}
            )
            await Stats.findOneAndUpdate( 
                { _id: mark.stats[1] },
                { $set: {
                    userId: mark._id
                }}
            )
            const james = await User.findOne({
                username: "James"
            })
            await Stats.findOneAndUpdate( 
                { _id: james.stats[0] },
                { $set: {
                    userId: james._id
                }}
            )
            await Stats.findOneAndUpdate( 
                { _id: james.stats[1] },
                { $set: {
                    userId: james._id
                }}
            )
            await Stats.findOneAndUpdate( 
                { _id: james.stats[2] },
                { $set: {
                    userId: james._id
                }}
            )
            const frank = await User.findOne({
                username: "Frank"
            })
            await Stats.findOneAndUpdate( 
                { _id: frank.stats[0] },
                { $set: {
                    userId: frank._id
                }}
            )
            await Stats.findOneAndUpdate( 
                { _id: frank.stats[1] },
                { $set: {
                    userId: frank._id
                }}
            )
            await Stats.findOneAndUpdate( 
                { _id: frank.stats[2] },
                { $set: {
                    userId: frank._id
                }}
            )
            await Stats.findOneAndUpdate( 
                { _id: frank.stats[3] },
                { $set: {
                    userId: frank._id
                }}
            )
        }

    } catch (err) {
        console.error(err);
        process.exit();
    }
    process.exit();
})