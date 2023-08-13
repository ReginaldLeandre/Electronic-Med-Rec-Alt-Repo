//  connection string - .env
require('dotenv').config()

// db - connection
require('./database')

// import model - Patient
const Patient = require("../models/patient");

// false data
const patient1 = {
    
}