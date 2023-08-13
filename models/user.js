const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;


const userSchema = new Schema( {
    name: {
        type: String
    },
    role: {
        type: String
    }
    // userId: Schema.Types.ObjectId
    // googleID: type: String, required: true (step 8.3)
 },
 {
    timestamps: true,
})


module.exports = mongoose.model("User", userSchema);