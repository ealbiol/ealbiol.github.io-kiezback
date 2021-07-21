


const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator")

let Schema = mongoose.Schema


const validRoles = {
    values: ["ADMIN", "USER"],
    message: "{VALUE} is not a valid role."
}

let userSchema = new Schema({



    email: {
        type: String,
        unique: true, //changed
        required: [true, "Email is required"]
    },
    username: {
        type: String,
        unique: false,
        required: [true, "Username is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },

    role: {
        type: String,
        default: "USER",
        enum: validRoles
    },

    active: {
        type: Boolean,
        default: true
    }
});



userSchema.methods.toJSON = function () {
    const user = this;

    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.__v;

    return userObject;
};
//


userSchema.plugin(uniqueValidator, { message: "{PATH} should be unique" })

module.exports = mongoose.model("User", userSchema);