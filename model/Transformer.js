const mongoose = require("mongoose");
const slugify = require("slugify")

const TransformerSchema = mongoose.Schema({
    transformerName: {
        type: String,
        required: [true, "Transformer Name is required"]
    },

    transformerRating: {
        type: String,
        required: [true, "Transformer rating is required"]
    },

    transformerImage: String,

    transformerCapacity: {
        type: String,
        required: [ true, "Transformer capacity is required "]
    },

    averageHourlySupply: {
        type: String,
        required: [true, "Average hourly supply is required"]
    },

    feederName: {
        type: String,
        required: [true, "Feeder name is required"]
    },

    bandDescription: {
        type: String,
        enums: ["Band A", "Band B", "Band C", "Band D", "Band E"]
    },

    cappedUnit: {
        type: Number,
        required: [true, "Capped unit is for this transformer is required"]
    },

    locationCoords : {
        type : String,
        required : [true, "Location coordinate is required"]
    },

    transformerOwner: String,
    transformerAddress: {
        type: String,
        required: [true, "Transformer address is required"]
    },

    googleMapCoords : {
        type : String,
        required : [true, "Google map coordinate is required"]
    },
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

    connectionType: String,
    dtType: String,
    dtMeterNo: String, 

    code: {
        type: String,
        unique: true
    },

    inpedantLoss: {
        type: String,
        required: [true, "Transformer Inpendant loss is required"]
    },

    feeder: {
        type: mongoose.Schema.ObjectId,
        ref: 'feeder'
    }
})

TransformerSchema.pre("save", async function(next){
    this.areaCode = `${this.googleMapCoords.split(",")[0].substr(3,2)}${this.googleMapCoords.split(",")[1].substr(3,2)}`
    const name = `${this.serviceCenter.substr(0, 3)} ${this.office.substr(0, 3)} ${this.transformerRating}`
    const nam = `${name} ${this.transformerName} ${this.areaCode}`.toUpperCase()
    this.code = slugify(nam)

    if(this.averageHourlySupply === 1-8 ){ this.bandDescription = 'Band E'}
    if(this.averageHourlySupply === 9-12 ){ this.bandDescription = 'Band D'}
    if(this.averageHourlySupply  === 13-16 ){ this.bandDescription = 'Band C'}
    if(this.averageHourlySupply  === 17-20 ){ this.bandDescription = 'Band B'}
    if(this.averageHourlySupply  === 21-24 ){ this.bandDescription = 'Band A'}
    
    const codes = await this.model('feeder').findOne({ code: this.feederName})
    this.feeder = codes._id
    
    next()
})


module.exports = mongoose.model("transformer", TransformerSchema)