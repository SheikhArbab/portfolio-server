import mongoose from "mongoose";
const { Schema } = mongoose;

const authSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg",
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
  },
  { timestamps: true }
);

export const Auth = mongoose.model("auth", authSchema);
