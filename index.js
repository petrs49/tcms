const express = require("express");
const app = express();
const dotenv = require('dotenv');
const colors = require('colors');
const cookies = require("cookie-parser")
const fileUpload = require("express-fileupload");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errors");
const cors = require('cors')
const path = require("path")

//Dotenv path
dotenv.config({ path: './config/.env'});

//Connect DB
connectDB();

//Accept customers' input
app.use(express.json({ extended: false }))

// Access uploaded files
app.use(express.static(path.join(__dirname, "public")))

//Middleware
app.use(logger)
app.use(cors())
app.use(cookies())
app.use(fileUpload())

// Initialization of Routes
const customer = require('./routes/customer')
const property = require('./routes/property')
const metering = require('./routes/metering')
const transformer = require('./routes/transformer')
const feeder = require('./routes/feeder')
const user = require('./routes/user')



//Upload an Image
app.post("/upload", (req, res) => {  
    if( !req.files ) {
        return res.status(400).json({msg: 'No file uploaded', success: false})
    }
    const file = req.files.file;
    file.mv(`${__dirname}/public/uploads/${file.name}`, err => {
        if(err){
            console.error(err)
            return res.status(500).send(err)
        }
        res.status(200).json({ fileName: file.name, success: true})
    })
})

//Initialize Routes
app.use("/api/v1/customer", customer)
app.use("/api/v1/property", property)
app.use("/api/v1/metering", metering)
app.use("/api/v1/transformer", transformer)
app.use("/api/v1/feeder", feeder)
app.use("/api/v1/user", user)




// Welcome Page
app.use(express.static("client/build"))
app.get('*', ( req, res ) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))


//PDF Generator



//Catch possible Errors
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server starts on port: http://localhost:${PORT}`.yellow.bold))