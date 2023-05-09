const db = require("../config/connection");
const { User, Stats, Sport } = require("../models/");

db.once("open", async () => {
    try {
        await Sport.deleteMany()
        const sports = await Sport.insertMany([
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
                sport: sports[0]._id
            },
            {
                totalPoints: 2,
                rebounds: 2,
                assists: 2,
                steals: 2,
                turnovers: 2,
                fouls: 2,
                userId: null,
                sport: sports[0]._id
            },
            {
                totalPoints: 3,
                rebounds: 3,
                assists: 3,
                steals: 3,
                turnovers: 3,
                fouls: 3,
                userId: null,
                sport: sports[0]._id
            },
            {
                totalPoints: 4,
                rebounds: 4,
                assists: 4,
                steals: 4,
                turnovers: 4,
                fouls: 4,
                userId: null,
                sport: sports[0]._id
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
                stats: stats[2]._id
            },
            {
                username: "Frank",
                email: "frank@test.com",
                password: "password1",
                stats: stats[3]._id
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
            const frank = await User.findOne({
                username: "Frank"
            })
            await Stats.findOneAndUpdate( 
                { _id: frank.stats[0] },
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