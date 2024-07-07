// import mongoose from "mongoose";

// export async function connect() {
// 	try {
// 		mongoose.connect(
// 			process.env.MONGODB_URL!
// 			/* ERROR:-
//                         Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
//                         Type 'undefined' is not assignable to type 'string'.ts(2345)
//                         (property) NodeJS.Process.env: NodeJS.ProcessEnv
//                         The process.env property returns an object containing the user environment.
//                 Problem:-
//                         yhn pe yeh problem aaya h ki typescript ko pata hi nhi h ki data aaya hi h or yeh assure krne k liye ki data aaya hi "process.env.MONGODB_URL" ko yeh variable mai v store h or check kr skte h ki aa hi gya h.
//                         lakin yhn pe hmlog ek hack use kr skte h ki --> process.env.MONGODB_URL! yeh kr skte h
//           */
// 		);
// 		const connection = mongoose.connection;
// 		connection.on("connected", () => {
// 			console.log("MongoDB connected successfully");
// 		});
// 		connection.on("error", (err) => {
// 			console.log(
// 				"Error while connecting to DB, please check DB connection: " + err
// 			);
// 			process.exit();
// 		});
// 	} catch (error) {
// 		console.log("Something went wrong in connecting to DB");
// 		console.log(error);
// 	}
// }

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connect() {
	const dbURI = process.env.MONGODB_URL;

	if (!dbURI) {
		console.error(
			"Error: MONGODB_URL is not defined in the environment variables."
		);
		process.exit(1); // Exit the process with a failure code
	}

	try {
		await mongoose.connect(dbURI);
		const connection = mongoose.connection;

		connection.on("connected", () => {
			console.log("MongoDB connected successfully");
		});

		connection.on("error", (err) => {
			console.error(
				"Error while connecting to DB, please check DB connection: " + err
			);
			process.exit(1);
		});
	} catch (error) {
		console.error("Something went wrong in connecting to DB");
		console.error(error);
		process.exit(1);
	}
}
