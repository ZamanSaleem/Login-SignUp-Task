const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// REGISTER

// get username, email, password
// check alreday registered or not
// hash password
// save user
// send res

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkuser = await User.findOne({ email });
    if (checkuser)
      return res.json({
        success: false,
        message: "Already Registered With This E-Mail",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration Successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

// LOGIN

// get email,password from user
// check user registered or not
// compare password
// generate Token
// send response

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkuser = await User.findOne({ email });

    if (!checkuser)
      return res.json({
        success: false,
        message: "User doesn't Exists! Please Registered First",
      });
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkuser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect Password! Please try again",
      });
    const token = jwt.sign(
      {
        id: checkuser._id,
        email: checkuser.email,
        role: checkuser.role,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in Successfully",
      user: {
        email: checkuser.email,
        id: checkuser._id,
        role: checkuser.role,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

const logoutUser = async (req,res) => {
  res.clearCookie('token').json({
    success : true,
    message : "Logged out successfully!"
  })
}
const authMiddleware = async(req,res,next) => {
  const token = req.cookies.token;
  if(!token) return res.status(401).json({
    success : false,
    message: "Unauthorised User!"
  })
  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded,
    next()
  } catch (error){
    res.status(401).json({
      success : false,
      message: "Unauthorised user!"
    })
  }
}

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };