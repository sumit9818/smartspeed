const mongoose = require("mongoose");
Schema = mongoose.Schema;

// 2. Define the MongoDB schema for the people collection
var AthleteProgramInstructionSchema = new Schema({
    instructionId: { type: String },
    status :   { type: Boolean, default: true },
    athlete_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('AthleteProgramMapping', AthleteProgramInstructionSchema);