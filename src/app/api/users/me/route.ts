import { connect } from "@/dbConnect/dbConnect";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
	try {
		const userId = await getDataFromToken(request);
		const user = await User.findOne({ _id: userId }).select("-password");
		// console.log(
		// 	"\nRequest: " +
		// 		JSON.stringify(request) +
		// 		"\n User in me: " +
		// 		user +
		// 		" userID : " +
		// 		userId
		// );
		return NextResponse.json({
			mesaaage: "User found",
			data: user,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}
