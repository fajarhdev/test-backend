const jose = require("jose");

const verifyToken = async (req, res, next) => {
	const secret = process.env.SECRET_KEY;
	const secretDecoded = jose.base64url.decode(secret);

	const authHeader = req.headers["authorization"];
	const accessToken = authHeader && authHeader.split(" ")[1];

	if (accessToken === null) {
		return res.status(404);
	}
	try {
		const { payload, protectedHeader } = await jose.jwtDecrypt(accessToken, secretDecoded);
		if (payload === null || payload.users_id === null) return res.status(403);
		req.users_id = payload.users_id;
		next();
	} catch (error) {
		return res.status(404).json({ msg: "User unauthorized" });
	}
};

module.exports = verifyToken;
