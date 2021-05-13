const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../model/User");



//method    GET/api/v1/user
//desc      Get all users info
//access    Private & Admin Only
exports.getUsers = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('-password')

    res.status(200).json({
        success: true,
        data: user
    })
});

//method    GET/api/v1/user/:1d
//desc      Get all users info
//access    Private
exports.getUser = asyncHandler(async (req, res, next) => {
    if( req.params.id !== req.user.id ){
        return next(new ErrorResponse("Unauthorized user", 409))
    }
    //Fetch from Operations
    const customer = await Custome.findOne().limit(5).select("-_id -password")

    res.status(200).json({
        success: true,
        data: customer
    })
});

//method    POST/api/v1/user
//desc      Get all users info
//access    Private
exports.createUser = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    const userCheck = await User.findOne({email});

    if(userCheck){
        return next(new ErrorResponse("Email already exist", 400))
    }

    const user = await User.create(req.body)
    CookieConfig(user, 200, res);
});

//method    POST/api/v1/user
//desc      Login in
//access    Private
exports.loginUser = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})

    //Trying written code
    if(user === null){
        return next(new ErrorResponse("Invalid login credential", 401))
    }

    if(!email || !password){
        return next(new ErrorResponse("Please provide email address or password", 400))
    }
    // compare password
    const isMatch = await user.matchPassword(password)

    if(!isMatch){
        return next(new ErrorResponse("Invalid login credential", 401))
    }

   CookieConfig(user, 200, res);
});

//method    PUT/api/v1/user/:1d
//desc      Update users Operations
//access    Private
exports.updateUserInfo = asyncHandler(async (req, res, next) => {
    const {telephone, designation, serviceCenter, name } = req.query;

    if(!telephone && designation && serviceCenter && name ){
        return next(new ErrorResponse(""))
    }
    //Fetch from Operations
    const customer = await Custome.findOne({name, designation, telephone, serviceCenter})

    res.status(200).json({
        success: true,
        data: customer
    })
});

//method    GET/api/v1/user
//desc      Log user out
//access    Private & Admin Only
exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date((Date.now() + 10) * 1000),
        httpOnly: true
    })


    res.status(200).json({
        success: true,
        data: {}
    })
});



// Cookie Config
const CookieConfig = (user, statusCode, res) => {
    //Get token from user model
    const token = user.userSignature();
    if(process.env.NODE_ENV === "production"){
        options.secure = true
    }
   const options = {
        expires: new Date(Date.now()+ (process.env.COOKIE_EXPIRE * (24 * 60) * (60 * 1000))),
        httpOnly: true
    };

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
        success: true,
        data: token
    })
}
