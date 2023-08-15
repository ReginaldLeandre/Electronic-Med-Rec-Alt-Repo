const Patient = require("../models/patient");
const User = require("../models/user");

module.exports = {
    index,
    new: addUser,
    create: createUser,
    show,
    addToProvider,
    removeFromProvider,
    edit,
    update
}


async function index (req, res, next) {
    try {
        const results = await User.find({ }).sort("name");
        // console.log(results)
        res.render('users/index', { title: "All Providers", users: results })
    } catch (err) {
        console.log(err.message);
        next (Error(err))
    }

}


async function show (req, res, next) {
    try {

        // console.log("trying to find all Patients")

        const user  = await User.findOne({_id: req.params.userId})

        const allPatientsAssigned = await Patient.find({ providers: user._id }).sort("name")

        const allPatients = await Patient.find({  })

        const availableOptions = await Patient.find({providers: {$ne: user._id}}).sort("name")
        
        // console.log(user)
        res.render("users/show", {
            title: user.name,
            user,
            patients: allPatientsAssigned,
            allPatients,
            availableOptions
        })
    }catch(err) {
        console.log(err)
        next(Error(err))
    }
}

function addUser (req, res, next) {
    const options = ["Nurse Practitioner", "Registered Nurse", "Full-Stack Developer", "Physician", "Lab Technician", "Radiologist", "Clerk", "Other"]
    res.render("users/new", { 
        title: "Add Provider",
        options

    } )
    // not an async function
}


async function createUser(req, res, next) {

    // can have a default googleid (if one otherwise not available by login) for the site admin (make email just for the app)

    console.log("creating new user")
    try {
        const newData = {...req.body}
        newData.admin = (req.body.admin) ? true : false
        await User.create(newData)
        res.redirect("/users" )
    }catch(err) {
        console.log(err)
        next(Error(err))
    }
}


async function addToProvider (req, res, next) {

    console.log("trying to add patient to provider")

        const providerId = req.params.userId

        const patientId = req.body.patientId // patient data from the form select 
        
        try {
            const foundPatient = await Patient.findById(patientId)

            foundPatient.providers.push(providerId)

            await foundPatient.save()

            // console.log("try to find provider ID ", providerId)

            res.redirect(`/users/${providerId}`)


        }catch (err){
            console.log(err)
            res.redirect('/')
        }
    }


    async function removeFromProvider (req, res, next) {

        console.log("trying to remove patient from provider")
    
            const providerId = req.params.userId
    
            const patientId = req.body.patientId // patient data from the form select 

            try {

                const patient = await Patient.findById(patientId)

                patient.providers.remove({_id: providerId})

                await patient.save()
    
                res.redirect(`/users/${providerId}`)
    

            }catch (err){
                console.log(err)
                res.redirect('/')
            }
        }

async function edit(req, res, next) {
    const options = ["Nurse Practitioner", "Registered Nurse", "Full-Stack Developer", "Physician", "Lab Technician", "Radiologist", "Clerk", "Other"]
    try{
        const user = await User.findById(req.params.userId)
        res.render("users/edit", {
            title: `Edit User: ${user.name}`,
            user,
            options
        })
    }catch(err) {
        console.log(err)
        next(Error(err))
    }
}

async function update(req, res, next) {
    try {
        const user = await User.findById(req.body.userId)
        console.log("updating user, old data: ", user)
        const updatedData = {...req.body}
        updatedData.admin = updatedData.admin ? true : false
        await User.findOneAndUpdate({_id: user._id}, updatedData)
        user.save()
        console.log("updated user data, new data: ", user)
        res.redirect(`/users/${user._id}`)
    }catch(err) {
        console.log(err)
        next(Error(err))
    }
}