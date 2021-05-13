const mongoose = require("mongoose")

const PropertySchema = mongoose.Schema({
    googleMapCoords : {
        type: String,
        required: [true, "Google map is required"]
    },

    contractNumber: String,
    enumerationStatus: {
        type: String,
        required: [true, "Enumeration status is required"]
    },
    propertyId: {
        type: String,
        unique: true
    },
    locationCoords: {
        type: String,
        required: [true, "Phone coordinate is required"]
    },

    propertyImage: {
        type: String,
        required: [true, "Property image is required"]
    },

    propertyServicePointImage: {
        type: String,
        required: [true, "Property service point image is required"]
    },

    distanceFromSubstation: String,
    transformerName: String,
    feederName: String,
    poleNumber : Number,
    phase: String,
    bookCode: String,
    route: String,
    itinerary: String,
    buildingAddress: String,
    buildingType: String,
    buildingActivity: String,
    buildingUse: String,
    needPole: String,
    requestType: String,
    connectionPossible: String,
    connectionType: String,
    comments: String,
    networkType: String,
    volt: String,
    areaType: String,
    occupantName: String,
    occupantRole: String,
    propertyOwnerName: String,
    propertyOwnerContact: String,
    occupantContact: String,
    areaCode: String,
    geoCode: String,
    _center: String,    
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
    createAt: {
        type: Date,
        default: Date.now
    },

    capturedBy: {
        staffName: String,
        staffId: String,
        designation: String
    }

})

PropertySchema.pre("save", async function(){
    
    const code0 = `${this.googleMapCoords.split(",")[0].substr(0,1)}${this.googleMapCoords.split(",")[0].substr(2,1)}`
    const code1 = `${this.googleMapCoords.split(",")[1].substr(0,1)}${this.googleMapCoords.split(",")[1].substr(2,1)}`
    const _Id = Math.ceil(Math.random()*9900+ new Date().getMilliseconds()+new Date().getSeconds())+90000
   
    this._center = `${this.googleMapCoords.split(",")[0].substr(5,3)}${this.googleMapCoords.split(",")[1].substr(5,3)}`
    this.areaCode = `${this.googleMapCoords.split(",")[0].substr(3,2)}${this.googleMapCoords.split(",")[1].substr(3,2)}`
    this.geoCode = `${code0}${code1}`
    this.propertyId = `${_Id}${this._center}`
})

module.exports = mongoose.model("property", PropertySchema)