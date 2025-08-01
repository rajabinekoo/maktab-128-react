const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "firstname is required"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "lastname is required"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: [8, "password must have more or equal then 8 characters"],
      select: false,
      validate: {
        validator: (password) => passwordRegex.test(password),
        message: "password must have at least one letter and one digit",
      },
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: [true, "phoneNumber is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "address is required"],
      trim: true,
    },
    role: {
      type: String,
      default: "USER",
      enum: {
        values: ["ADMIN", "USER"],
        message: "invalid role: ({VALUE})",
      },
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// hash user password
UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 12);
  next();
});

// compare hash and plain password
UserSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

module.exports = model("User", UserSchema);
