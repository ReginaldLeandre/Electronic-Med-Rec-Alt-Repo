const { application } = require("express");
const Patient = require("../models/patient");
const User = require("../models/user");


const lineBreak = require("../config/lineBreaks.js");


// var { Configuration, OpenAiApi } = require("openai");

var OpenAiApi = require("openai");


module.exports = {
    index,
    new: addPatient,
    create: createPatient,
    show,
    dischargeAdmit,
    testChat: generateDS
}


async function index (req, res, next) {

    try {
        if (req.query.searchQuery === "all") {
            const results = await Patient.find({}).sort("name");
            res.render('patients/index', { 
                title: "All Patients", 
                patients: results 
            })
        } else if (req.query.searchQuery === "discharged") {
            const results = await Patient.find({discharged: true});
            res.render("patients/index", {
                title: "Discharged Patients",
                patients: results
            })
        } else {
            const results = await Patient.find({discharged: false}).sort("name");
            res.render('patients/index', { 
                title: "Admitted Patients", 
                patients: results
            })
        }
    } catch (err) {
        console.log(err);
        next (Error(err))
    }
}



 function addPatient(req, res, next) {
    
        // const { name, DOB, chiefComplaint, medHx } = req.body;
        // const newPatient = new Patient({ name, DOB, chiefComplaint, medHx });
        // await newPatient.save();
        res.render("patients/new", {title: "Add New Patient"})
    
        // console.log("Patient added Successfully!");
      
}




async function createPatient(req, res, next) {

    try {
        const { name, DOB, chiefComplaint, medHx } = req.body;
        const newPatient = new Patient({ name, DOB, chiefComplaint, medHx });
        await newPatient.save();
        newPatient.admissionDates.push(new Date())
        // const newPatient = {...req.body}
        // await Patient.create(newPatient)
        console.log("Patient added Successfully!");
        res.redirect('/patients');
      } catch (error) {
        console.log(err.message);
        next (Error(err));
      }
}


async function show (req, res, next) {
    try {
        const patient  = await Patient.findOne({_id: req.params.patientId}).populate("providers")

        // const providers = patient.providers.map(provider => (provider.name))
        const providers = patient.providers
        const avatars = patient.providers.map(provider => (provider.avatar))

        // dischargeSum = await testChat(patient._id)

        // res.send(patient)
        // console.log(patient)
        res.render("patients/show", {
            title: patient.name,
            patient,
            providers,
            avatars
            // dischargeSum
        })
    }catch(err) {
        console.log(err)
        next(Error(err))
    }
}

async function dischargeAdmit (req, res, next) {
    try{
        const patient = await Patient.findById(req.params.patientId);
        // console.log(patient)
        patient.discharged = patient.discharged ? false : true;
        if (patient.discharged) {
            patient.dischargeDates.push(new Date())
        } else {
            patient.admissionDates.push(new Date())
        }
        await patient.save()
        res.redirect('/patients')
    }
    catch (err) {
        console.log(err);
        next(Error(err));
    }
}

async function generateDS(req, res, next) {
    console.log("generating ds summary")
    const openai = new OpenAiApi({
        apiKey: process.env.OPENAI_API_KEY,
    });
    console.log("key loaded")
    try {
        let allNotes = ""
        const patient = await Patient.findById(req.params.patientId)
        console.log("found patient", patient)
        function convert(array) {
            array.forEach(function(element) {
                allNotes +=  element
            })
        }
        convert(patient.progressNotes)
        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `write me a hospital discharge summary for a patient named ${patient.name} based on the following progress notes: ${allNotes}. Lookup the current date and current time and reference these values as time and date for discharge` }],
            model: 'gpt-3.5-turbo',
          });
        const output = completion.choices[0].message.content

        let formattedOutput = lineBreak(output)

        res.render("patients/discharge-summary",{
            title: `${patient.name}: Discharge Summary`,
            patient,
            formattedOutput
        })

    }catch(err) {
        console.log(err)
        next(Error(err))
    }
}



// async function testChat (res, req) {
//     console.log("generating")
    
//     const openai = new OpenAiApi({
        
//         apiKey: process.env.OPENAI_API_KEY,
        
//     });
    
//     try {
//         const patient = await Patient.findOne({_id: req.params.patientId})
//         console.log(patient)
//     // const dischargeSummary = chatGPT.generateDS(patient)
//     // req.send(dischargeSummary)
//     // console.log(dischargeSummary)

//     console.log("generating discharge summary")

//     let allNotes = ""
//     function convert () {
//       patient.progressNotes.forEach(function(note) {

//                 allNotes += note
//             })

//             // console.log(typeof(allNotes))
//             return allNotes
//         // console.log(allNotes)

//       }
    
//     convert()

    // const completion = await openai.chat.completions.create({
    //   messages: [{ role: 'user', content: `write me a hospital discharge summary that is well formatted with proper indentation for a patient named ${patient.name} given the following progress notes: ${allNotes}` }],
    //   model: 'gpt-3.5-turbo',
    // });
  
//     console.log(completion.choices[0].message.content);
//     req.json(completion.choices[0].message.content)
//     // return  completion.choices[0].message.content

//     // res.send(completion.choices[0].message.content)

  
// } catch(err) {
//     console.log(err)
//     // next(Error(err))
// }

// }

