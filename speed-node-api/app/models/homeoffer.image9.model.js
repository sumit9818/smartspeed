const mongoose = require("mongoose");
Schema = mongoose.Schema;

    // 2. Define the MongoDB schema for the people collection
    var HomeImage9Schema  = new Schema({
        title     :   {type: String},
        isactive :   { type: Boolean, default: true },
        created_at:      {type: Date,default: Date.now()},
        image     :   {type: String}
      });

module.exports = mongoose.model('HomeImage9', HomeImage9Schema);