const Patient = require("../models/patient");
const User = require("../models/user");

module.exports = {
    index,
    new: addUser,
    create: createUser

}



async function index (req, res, next) {
    try {
        const results = await User.find({ });
        res.render('users/index', { title: "All Providers", users: results })
    } catch (err) {
        console.log(err.message);
        next (Error(err))
    }

}


function addUser (req, res, next) {
    res.render("users/new", { title: "Add Provider"} )
    // not an async function
}


async function createUser(req, res, next) {
    console.log("creating new user")
    try {
        const newData = {...req.body}
        await User.create(newData)
        res.redirect("/users" )
    }catch(err) {
        console.log(err)
        next(Error(err))
    }
}
