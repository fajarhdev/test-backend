const User = require("../models/User");
const jose = require("jose");
const { Op } = require("sequelize");

const Login = async (req, res) => {
	const secret = process.env.SECRET_KEY;
	const secretRefresh = process.env.SECRET_KEY_REFRESH;
	/**
	 * Check request domain and password not null (done)
	 * Check user domain exist in DB (done)
	 * Encrypt password using TripleDes
	 * Hit EAI Endpoint to get response
	 * Generate Refresh token and Access token on success
	 */
	const { username, password } = req.body;
	try {
		if (
			username === null ||
			username === "" ||
			username === undefined ||
			password === null ||
			password === "" ||
			password === undefined
		) {
			return res.status(400).json({ msg: "Semua kolom harus diisi" });
		}
		// console.log(domain);
		const user = await User.findOne({
			where: { [Op.and]: [{ username: username }, { password: password }] },
		});

		console.log(user);

		if (user === null) {
			return res.json({ msg: "User tidak ditemukan" }).status(404);
		}

		const users_id = user.users_id;
		const secretDecoded = jose.base64url.decode(secret);
		const secretRefreshDecoded = jose.base64url.decode(secretRefresh);
		const accessToken = await new jose.EncryptJWT({ users_id })
			.setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
			.setExpirationTime("60m")
			.encrypt(secretDecoded);
		const refreshToken = await new jose.EncryptJWT({ users_id })
			.setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
			.setExpirationTime("1d")
			.encrypt(secretRefreshDecoded);

		// insert to token
		// const token = Token.create({
		// 	token: refreshToken,
		// 	users_id: user.users_id,
		// });

		// res.cookie("refreshToken", refreshToken, {
		// 	httpOnly: true,
		// 	maxAge: 24 * 60 * 60 * 1000,

		// });
		res.setHeader(
			"Set-Cookie",
			`refreshToken=${refreshToken}; Path=/; HttpOnly; SameSite=None; Max-Age=86400`
		);
		res.json({ accessToken });
	} catch (error) {
		console.log(error);
		res.status(404).json({ msg: error });
	}
};

module.exports = { Login };
