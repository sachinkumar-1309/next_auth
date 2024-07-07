import { connect } from "@/dbConnect/dbConnect";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		// console.log("reqBody: " + JSON.stringify(reqBody));

		const { username, email, password } = reqBody;
		//validation nhi  kr rhe h

		const user = await User.findOne({ email });

		if (user) {
			throw NextResponse.json(
				{ error: "User already registered!!" },
				{ status: 404 }
			);
		}
		// console.log("Already registered User: " + user);

		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});
		// console.log("New user: " + JSON.stringify(newUser));

		const savedUser = await newUser.save();
		// console.log("Saved user: " + JSON.stringify(savedUser));

		//send verification email
		await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

		return NextResponse.json({
			message: "User registered successfully",
			success: true,
			savedUser,
		});
	} catch (error: any) {
		throw NextResponse.json({ error: error.message }, { status: 500 });
	}
}
