const mongoose = require('mongoose')

const CustomerSchema = mongoose.Schema({
    propertyId: String,
    contractNumber: String,
    customerName: String,
    gender: String,
    identityNo : Number,
    identityType: String,
    title: String,
    maritalStatus: String,
    email: String,
    city: String,
    area: String,
    street: String,
    state: String,
    fullAddress: String,
    phone1: {
        type: String,
        required: [ true, "Phone number is required"]
    },
    phone2: String,
    fax: String,
    fname: String,
    lname: String,

    serviceCenter: {
        type: String,
        required: [true, "Service Center name is required"]
    },
    office: {
        type: String,
        required: [true, "Office name is required"]
    },
    region: {
        type: String,
        required: [true, "Region name is required"]
    },

   
})

CustomerSchema.pre("save", function(){
    this.fullAddress = `${this.street} ${this.area} ${this.city} ${this.state}`
    this.customerName = `${this.fname} ${this.lname}`
    this.propertyId = Math.ceil(Math.random()*9999900+ new Date().getMilliseconds()+new Date().getSeconds())+400000000
})


module.exports = mongoose.model("customer", CustomerSchema)