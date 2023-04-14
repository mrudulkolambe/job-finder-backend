const jwt = require('jsonwebtoken');

const decodeToken = (req, res, next) => {
	try {
		let token = req?.headers?.authorization?.split(" ")[1];
		const _id = jwt.verify(token, process.env.JWT_SECRET)
		let user = {
			_id: _id
		}
		req['user'] = user;
		next();
	} catch (err) {
		return res.json({ error: true, message: err.message, user: undefined })
	}
}

module.exports = decodeToken;