const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema

let coatOfArmsImageSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "District Name is required"]
    },

    link: {
        type: String,
        required: [true, "Coat of Arms Image Link is required"]
    }
});



coatOfArmsImageSchema.plugin(uniqueValidator, {message: "{PATH} should be unique"})                         

module.exports = mongoose.model("CoatofArmsImage", coatOfArmsImageSchema);                                            