const mongoose = require('mongoose')


const MeteringSchema = mongoose.Schema({
    contractNumber: String,
    propertyId: {
        type: String,
        unique: true,
        required: [true, "Property Id is required"]
    },

    beforeInstallationImage: String,

    afterInstallationImage: String,
    
    meterAddress: String,
    meterPosition: String,
    meterCondition: String,
    customerAuthenticate: String,
    meterType: {
        type: String,
        required: [true, "Meter type is required"]
    },
    meterNumber: {
        type: String,
        required: [true, "Meter number is required"]
    },
    meterModel: String,
    phase: {
        type: String,
        required: [true, "Meter phase is required"]
    },
    meterOwner: String,
    meterProvider: {
        type: String,
        required: [true, "Meter provider is required"]
    },
    customerName: {
        type: String,
        required: [true, "Customer name is required"]
    },
    customerPhone: {
        type: String,
        required: [true, "Customer phone number is required"]
    },
    cartonNumber: {
        type: String,
        required: [true, "Carton number is required"]
    },
    meterSeal: {
        type: String,
        required: [true, "Meter seal is required"]
    },

    batchId: {
        type: String,
        required: [true, "Batch id is required"]
    },

    meterInstallationDate: String,
    installerName: String,
    installerVendor: String,
    installerPhone: String,
    installerId: String,
    serviceCenter: String,
    office: String,
    region: String,
    googleMapCoords: String,
    locationCoords: String,
    installationStatus: {
        type: Boolean,
        default: false
    },

    property: {
        type: mongoose.Schema.ObjectId,
        ref: 'property'
    }
})

MeteringSchema.pre('save', async function(){
    const property = await this.model('property').findOne({ propertyId: this.propertyId })
    this.property = property._id
    this.meterAddress = property.buidlingAddress
    this.region = property.region
    this.office = property.office
    this.serviceCenter = property.serviceCenter
    this.googleMapCoords = property.googleMapCoords
    this.locationCoords = property.locationCoords

    await this.model('property').findByIdAndUpdate(property._id, {
        connectionType: 'Metered'
    })
})


module.exports = mongoose.model('metering', MeteringSchema);