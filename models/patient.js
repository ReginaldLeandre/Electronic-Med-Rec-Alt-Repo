const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;


const vitalSchema = new Schema( {
    heartRate: {
      type: Number,
      min: 0,
    },
    systolic: {
      type: Number,
      min: 0
    },
    diastolic: {
      type: Number,
      min: 0
    },
    respirations: {
      type: Number,
      min: 0
    },
    oxygenSat: {
      type: Number,
      min: 0,
      max: 100
    },
    temp: {
      type: Number,
      min: 0
    },
    time: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);


const patientSchema = new Schema( {
    name: {
      type: String,
    },
    DOB: {
      type: Date
    },
    medHx: {
      type: [String]
    },
    chiefComplaint: {
      type: String
    },
    providers: [{
      type: Schema.Types.ObjectId, 
      ref: "User"
      
    }],
    vitals: [vitalSchema]
},
{
    timestamps: true,
})


module.exports = mongoose.model("Patient", patientSchema);