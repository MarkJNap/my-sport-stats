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
                minutes: 1,
                rebounds: 1,
                assists: 1,
                steals: 1,
                turnovers: 1,
                threePointMade: 1,
                fouls: 1,
                sport: sports[0]._id
            },
            {
                totalPoints: 2,
                minutes: 2,
                rebounds: 2,
                assists: 2,
                steals: 2,
                turnovers: 2,
                threePointMade: 2,
                fouls: 2,
                sport: sports[0]._id
            },
            {
                totalPoints: 3,
                minutes: 3,
                rebounds: 3,
                assists: 3,
                steals: 3,
                turnovers: 3,
                threePointMade: 3,
                fouls: 3,
                sport: sports[0]._id
            },
            {
                totalPoints: 4,
                minutes: 4,
                rebounds: 4,
                assists: 4,
                steals: 4,
                turnovers: 4,
                threePointMade: 4,
                fouls: 4,
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
    } catch (err) {
        console.error(err);
        process.exit();
    }
    process.exit();
})