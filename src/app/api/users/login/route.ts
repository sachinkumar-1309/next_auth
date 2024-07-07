import { connect } from "@/dbConnect/dbConnect";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		console.log("reqBody: " + JSON.stringify(reqBody));

		const { email, password } = reqBody;
		//validation nhi  kr rhe h

		const user = await User.findOne({ email });

		if (!user) {
			throw NextResponse.json(
				{ error: "User does not exists!!" },
				{ status: 404 }
			);
		}
		// console.log("User Exits");
		const validPassword = await bcryptjs.compare(password, user.password);
		if (!validPassword) {
			throw NextResponse.json({ error: "Invalid password" }, { status: 400 });
		}

		const tokenData = {
			id: user._id,
			username: user.username,
			email: user.email,
		};
		const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
			expiresIn: "1d",
		});
		const response = NextResponse.json({
			message: "Logged in successfully",
			success: true,
            data:user
		});
		response.cookies.set("token", token, { httpOnly: true });
		return response;
	} catch (error: any) {
		throw NextResponse.json({ error: error.message }, { status: 500 });
	}
}
