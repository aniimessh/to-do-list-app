const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      required: [true, "Username is required"],
      type: String,
      unique: true,
    },
    email: {
      required: [true, "Email is required"],
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      required: true,
      type: String,
      select: false,
    },
  },
  { timestamps: true },
);

// hash password before saving to database
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  try {
    // Generate Salt
    const salt = await bcrypt.genSalt(10);

    // Hash Password
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    console.log("Error in hashing password");
    console.log(error.message);
  }
});

// Compare password for Login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
