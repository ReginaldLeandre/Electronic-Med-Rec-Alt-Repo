const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;


const hpiSchema = new Schema( {
    hpi: String
})
   


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
      type: Date,
      default: returnDate()
    }
  },
  {
    timestamps: true,
  }
);

function returnDate() {
  return new Date()
}

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
    vitals: [vitalSchema],
    discharged: {
      type: Boolean,
      default: false
    },
    dischargeDates: {
      type: [Date],
    },
    admissionDates: {
      type: [Date],
    },
    hpi: [hpiSchema],
},
{
    timestamps: true,
})


module.exports = mongoose.model("Patient", patientSchema);