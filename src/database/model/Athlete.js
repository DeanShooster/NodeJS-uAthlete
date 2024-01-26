const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const athleteSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  personalDetails: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: Boolean,
      required: true,
    },
    weight: [
      {
        type: Number,
        required: true,
      },
    ],
    height: {
      type: Number,
      required: true,
    },
  },
  athleteRank: {
    type: Number,
    required: true,
    default: 0,
  },
  notifications: {
    isRead: { type: Boolean, default: false },
    messages: {
      type: [
        {
          title: { type: String },
          message: { type: String },
          date: { type: Date },
        },
      ],
      default: [
        {
          title: "New Athlete",
          message: "Welcome to uAthlete! We hope you will enjoy our services and use them in your personal journey.",
          date: new Date(),
        },
      ],
    },
  },
  progressionUpdates: [{ type: Date }],
  progress: {
    strength: {
      benchPress: [{ type: Number }],
      deadlift: [{ type: Number }],
      squat: [{ type: Number }],
      pullups: [{ type: Number }],
      dips: [{ type: Number }],
    },
    endurance: {
      squat: [{ type: Number }],
      pushups: [{ type: Number }],
      situps: [{ type: Number }],
      plank: [{ type: Number }],
      pools: [{ type: Number }],
      bike5KM: [{ type: Number }],
    },
    stamina: {
      run3KM: [{ type: Number }],
      run5KM: [{ type: Number }],
      run10KM: [{ type: Number }],
      sprint400M: [{ type: Number }],
    },
  },
});

athleteSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const athletePassword = await bcrypt.hash(this.password, 8);
    this.password = athletePassword;
  }
  next();
});

athleteSchema.methods.generateToken = async function () {
  const token = jwt.sign({ email: this.email }, process.env.SECRET, { expiresIn: "2w" });
  return token;
};

const Athlete = mongoose.model("Athlete", athleteSchema);
module.exports = Athlete;
