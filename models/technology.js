const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema

let technologySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Technology Name is required"]
    },

    image: {
        type: String,
        required: [true, "Technology Image is required"]
    },

    link: {
        type: String,
        required: [true, "Technology link is required"]
    }
});



technologySchema.plugin(uniqueValidator, { message: "{PATH} should be unique" })

module.exports = mongoose.model("Technology", technologySchema);