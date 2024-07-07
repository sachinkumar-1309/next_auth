// import nodemailer from "nodemailer";
// import bcryptjs from "bcryptjs";
// import User from "@/models/userModels";

// export const sendEmail = async ({ email, emailType, userId }: any) => {
// 	try {
// 		const hashedToken = bcryptjs.hash(userId.toString(), 10);
// 		if (emailType === "VERIFY") {
// 			await User.findOneAndUpdate(userId, {
// 				verifyToken: hashedToken,
// 				verifyTokenExpiry: Date.now() + 3600000,
// 			});
// 		} else if (emailType === "RESET") {
// 			await User.findOneAndUpdate(userId, {
// 				forgetPasswordToken: hashedToken,
// 				forgetPasswordTokenExpiry: Date.now() + 3600000,
// 			});
// 		}
// 		const transport = nodemailer.createTransport({
// 			host: "sandbox.smtp.mailtrap.io",
// 			port: 2525,
// 			auth: {
// 				user: "2d19a343eba81d", //😒
// 				pass: "afe498809c23b7", //😒
// 			},
// 		});

// 		const mailOptions = {
// 			from: "sachin@gmail.com",
// 			to: email,
// 			subject:
// 				emailType === "VERIFY" ? "Verify your email" : "Reset your email",
// 			html: `<p>
// 				Click <a href="${
// 					process.env.DOMAIN
// 				}/verifyemail?hashedToken=${hashedToken}">here</a> to ${
// 				emailType === "VERIFY" ? "Verify your email" : "Reset your password"
// 			} or
// 				copy and paste the link below in your browser
// 				<br />${process.env.DOMAIN}/verifyemail?hashedToken=${hashedToken}
// 			</p>`,
// 		};
// 		const mailResponse = await transport.sendMail(mailOptions);
// 		console.log("Mail response: " + mailResponse);
// 		return mailResponse;
// 	} catch (error: any) {
// 		throw new Error(error.message);
// 	}
// };
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModels";

export const sendEmail = async ({ email, emailType, userId }: any) => {
	try {
		// Log input parameters
		console.log("sendEmail called with: ", { email, emailType, userId });

		// Hash the token
		const hashedToken = await bcryptjs.hash(userId.toString(), 10);
		console.log("Hashed token: ", hashedToken);

		// Update user based on email type
		let updateResult;
		if (emailType === "VERIFY") {
			updateResult = await User.findOneAndUpdate(userId, {
				$set: {
					verifyToken: hashedToken,
					verifyTokenExpiry: Date.now() + 3600000,
				},
			});
		} else if (emailType === "RESET") {
			updateResult = await User.findOneAndUpdate(userId, {
				$set: {
					forgetPasswordToken: hashedToken,
					forgetPasswordTokenExpiry: Date.now() + 3600000,
				},
			});
		}
		console.log("User update result: ", updateResult);

		// Create transporter
		const transport = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: "2d19a343eba81d",
				pass: "afe498809c23b7",
			},
		});
		console.log("Transporter created");

		// Define mail options
		const mailOptions = {
			from: "sachin@gmail.com",
			to: email,
			subject:
				emailType === "VERIFY" ? "Verify your email" : "Reset your email",
			html: `<p>
				Click <a href="${
					process.env.DOMAIN
				}/verifyemail?hashedToken=${hashedToken}">here</a> to ${
				emailType === "VERIFY" ? "Verify your email" : "Reset your password"
			} or
				copy and paste the link below in your browser
				<br />${process.env.DOMAIN}/verifyemail?hashedToken=${hashedToken}
			</p>`,
		};
		console.log("Mail options: ", mailOptions);

		// Send the email
		const mailResponse = await transport.sendMail(mailOptions);
		console.log("Mail response: ", mailResponse);
		return mailResponse;
	} catch (error: any) {
		console.error("Error in sendEmail: ", error);
		throw new Error(error.message);
	}
};
