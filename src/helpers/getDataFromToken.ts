import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModels";
export const getDataFromToken = (request: NextRequest) => {
	// const token = request.cookies.token;
	// const user = async (decodedToken: { username: any }) => {
	// 	await User.findOne({ username: decodedToken.username }).select(
	// 		"-password"
	// 	);
	// };
	try {
		const token = request.cookies.get("token")?.value || "";
		const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
		// console.log("Userdata: " + user(decodedToken));
		console.log(
			"\n token: " +
				token +
				" \ndecodedToken: " +
				JSON.stringify(decodedToken.id)
		);
		return decodedToken.id;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
