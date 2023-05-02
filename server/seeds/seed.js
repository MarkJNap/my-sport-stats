const db = require("../config/connection");
const { User } = require("../models/");
const userData = require("./userData.json");

db.once("open", async () => {
    try {
        await User.deleteMany()
        await User.create(userData)
        console.log('users seeded');
    } catch (err) {
        console.error(err);
        process.exit();
    }
    process.exit();
})