import mongoose  from "mongoose" ;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "PLease provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "PLease provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "PLease provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTOkenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date
});

const User = mongoose.model.users || mongoose.model("users", userSchema)

export default User