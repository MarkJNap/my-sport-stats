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
                totalPoints: 1,
                rebounds: 1,
                assists: 1,
                steals: 1,
                turnovers: 1,
                fouls: 1,
                userId: null,
                sports: sports[0]._id
            },
            {
                totalPoints: 2,
                rebounds: 2,
                assists: 2,
                steals: 2,
                turnovers: 2,
                fouls: 2,
                userId: null,
                sports: sports[0]._id
            },
            {
                totalPoints: 3,
                rebounds: 3,
                assists: 3,
                steals: 3,
                turnovers: 3,
                fouls: 3,
                userId: null,
                sports: sports[0]._id
            },

            {
                goals: 4,
                behinds: 4,
                disposals: 4,
                tackles: 4,
                marks: 4,
                kicks: 4,
                userId: null,
                sports: sports[1]._id
            },
            {
                goals: 5,
                behinds: 5,
                disposals: 5,
                tackles: 5,
                marks: 5,
                kicks: 5,
                userId: null,
                sports: sports[1]._id
            },
            {
                goals: 6,
                behinds: 6,
                disposals: 6,
                tackles: 6,
                marks: 6,
                kicks: 6,
                userId: null,
                sports: sports[1]._id
            },

            {
                runs: 7,
                ballsFaced: 7,
                sixes: 7,
                overs: 7,
                wickets: 7,
                runsGiven: 7,
                userId: null,
                sports: sports[2]._id
            },            
            {
                runs: 8,
                ballsFaced: 8,
                sixes: 8,
                overs: 8,
                wickets: 8,
                runsGiven: 8,
                userId: null,
                sports: sports[2]._id
            },            
            {
                runs: 9,
                ballsFaced: 9,
                sixes: 9,
                overs: 9,
                wickets: 9,
                runsGiven: 9,
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