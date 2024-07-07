import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username is required"],
	},
	email: {
		type: String,
		required: [true, "email is required"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	forgetPasswordToken: String,
	forgetPasswordTokenExpiry: Date,
	verifyToken: String,
	verifyTokenExpiry: Date,
});

const User =
	mongoose.models.users ||
	/* Pehle aise hi krte the but nextJS edge pe run hota h toh usko pata hi nhi hota h ki yeh pehli baar model bana rha h ki pehle se baan chuka tha, esliye yhn ek baar dekh lenge ki model(<--) bana h ki nhi.. */ mongoose.model(
		"users",
		userSchema
	);
export default User;
