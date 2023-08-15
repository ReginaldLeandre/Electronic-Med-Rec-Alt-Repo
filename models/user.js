const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;


const userSchema = new Schema( {
    name: {
        type: String
    },
    role: {
        type: String,
        enum: ["Nurse Practitioner", "Registered Nurse", "Full-Stack Developer", "Physician", "Lab Technician", "Radiologist", "Clerk", "Other"],
        default: "Other"
        // consider making this enum
    }, 
    googleId: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    email: String,
    avatar: String,
    userId: Schema.Types.ObjectId
    },
    // googleID: type: String, required: true (step 8.3)
 {
    timestamps: true,
})


module.exports = mongoose.model("User", userSchema);