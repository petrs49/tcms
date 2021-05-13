const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcript = require("bcryptjs");


const UserSchema = mongoose.Schema({
    email: {
        type: String,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
                "Please enter a valid email address"],
        required: [true, "Email address is required"]
    },
    name: {
        type: String,
        required: [true, "Employee name required"]
    },
    telephone: String,
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    designation: {
        type: String, 
        required: [true, "Employee's designation is required"]
    },

    userName: String,
    serviceCenter: String,
    office: String,
    region: String,
    installerVendor: String,
    installerImage: String,
    installerWorkingExprience: String,
    
})

UserSchema.pre("save", async function(){
    const salt = await bcript.genSalt(10);
    this.password = await bcript.hash(this.password, salt)
});

UserSchema.methods.matchPassword = async function(pass){
    return await bcript.compare(pass, this.password)
};

UserSchema.methods.userSignature = function(){
    return jwt.sign({
        id: this._id,
        designation: this.designation
    }, process.env.SECRET_STRING, {
        expiresIn: 336000
    })
}

module.exports = mongoose.model("user", UserSchema)