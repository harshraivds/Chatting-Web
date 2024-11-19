import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: [validator.isEmail, "Please Enter a valid Email"],
		},
		profilePic: {
			type: String,
			default: "",
		},
		resetPasswordToken: String,
        resetPasswordExpire: Date,
		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
