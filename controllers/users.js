const Patient = require("../models/patient");
const User = require("../models/user");

module.exports = {
    index,
    new: addUser,
    create: createUser,
    show
}



async function index (req, res, next) {
    try {
        const results = await User.find({ });
        console.log(results)
        res.render('users/index', { title: "All Providers", users: results })
    } catch (err) {
        console.log(err.message);
        next (Error(err))
    }

}


async function show (req, res, next) {
    try {

        console.log("trying to find all Patients")

        const user  = await User.findOne({_id: req.params.userId})

        const allPatients = await Patient.find({ providers: user._id })

        console.log("looking for all matching patients", allPatients)

        console.log(user)
        res.render("users/show", {
            title: user.name,
            user,
            patients: allPatients
        })
    }catch(err) {
        console.log(err)
        next(Error(err))
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
