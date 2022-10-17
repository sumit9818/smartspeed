const mongoose = require("mongoose");
Schema = mongoose.Schema;

    // 2. Define the MongoDB schema for the people collection
    var Pricing2Schema  = new Schema({
        title: { type: String, required: 'title cannot be empty' },
        isactive: { type: Boolean, default: true },
        created_at: { type: Date, default: Date.now() },
        description: { type: String },
        price: { type: Number },
        plan_type:{type:String},
        data:{type : Object}
      });

module.exports = mongoose.model('Pricing2', Pricing2Schema);