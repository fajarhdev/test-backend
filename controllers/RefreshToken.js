const jose = require("jose");
// const { Op } = require("sequelize");
// const Token = require("../models/Token");

const refreshToken = async (req, res) => {
	const secretRefresh = process.env.SECRET_KEY_REFRESH;
	const secret = process.env.SECRET_KEY;
	// const alg = "HS256";
	const secretDecoded = jose.base64url.decode(secret);
	const secretRefreshDecoded = jose.base64url.decode(secretRefresh);
	try {
		const refreshToken = req.cookies.refreshToken;
		// const authHeader = req.headers['authorization']
		// const token = authHeader && authHeader.split(' ')[1]
		if (!refreshToken) return res.status(404);
		// if(token === null) return res.status(403)
		const { payload, _ } = await jose.jwtDecrypt(refreshToken, secretRefreshDecoded);
		// const token = await Token.findOne({
		// 	where: {
		// 		[Op.and]: [{ token: refreshToken }, { users_id: payload.users_id }],
		// 	},
		// });
		// if (token < 0) {
		// 	res.status(403);
		// }
		const accessToken = await new jose.EncryptJWT({
			users_id: payload.users_id,
		})
			.setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
			.setExpirationTime("60m")
			.encrypt(secretDecoded);
		res.status(200).json({ accessToken: accessToken });
	} catch (error) {
		res.json(404).json({ msg: error });
	}
};

module.exports = { refreshToken };
