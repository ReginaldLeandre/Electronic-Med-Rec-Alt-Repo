const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;


const vitalSchema = new Schema( {
    heartRate: Number,
    systolic: Number,
    diastolic: Number,
    respirations: Number,
    oxygenSat: Number,
    temp: Number,
    time: String
  },
  {
    timestamps: true,
  }
);


const patientSchema = new Schema( {
    name: String,
    DOB: Date,
    medHx: [String],
    chiefComplaint: String,
    providers: [{type: Schema.Types.ObjectId, ref: "User"}],
    vitals: [vitalSchema]
},
{
    timestamps: true,
})


module.exports = mongoose.model("Patient", patientSchema);