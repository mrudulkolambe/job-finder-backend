const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const handleSignup = async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(10);
		let hashedPassword = await bcrypt.hash(req.body.password, salt)
		const newUser = new User({ ...req.body, password: hashedPassword });
		finalUser = await newUser.save();
		if (finalUser) {
			let accesstoken = jwt.sign({ _id: finalUser._id }, process.env.JWT_SECRET)
			res.json({ message: 'Sign Up Successfull!', error: false, accesstoken: accesstoken })
		} else {
			res.json({ message: 'Something went wrong', error: true, user: undefined })
		}
	} catch (err) {
		res.json({ message: err.message, error: true, user: undefined })
	}
};

const handleSignIn = async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });
		if (user) {
			const isCorrect = await bcrypt.compare(req.body.password, user.password)
			if (isCorrect) {
				let accesstoken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
				res.json({ message: 'Sign In Successfull!', error: false, accesstoken: accesstoken })
			} else {
				res.json({ message: "Invalid Credentials!", error: true, user: undefined })
			}
		} else {
			res.json({ message: "Cannot find user!", error: true, user: undefined })
		}
	} catch (err) {
		res.json({ message: err.message, error: true, user: undefined })
	}
};

const getUserData = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user._id }, ['-password']);
		res.json({ message: 'Success', error: false, user: user })
	} catch (err) {
		res.json({ message: err.message, error: true, user: undefined })
	}
}

const updateUser = async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body,{returnOriginal: false} );
		res.json({ message: 'Profile Updated Successfully', error: false, user: updatedUser });
	} catch (err) {
		res.json({ message: err.message, error: true, user: undefined })
	}
}

const deleteUser = async (req, res) => {
	try {
		await User.findByIdAndDelete({ _id: req.user._id });
		res.json({ message: "User Deleted Successfully!", error: false, user: undefined })
	} catch (err) {
		res.json({ message: err.message, error: true, user: undefined })
	}
}

// const resetPassword = async (req, res) => {
// 	try{
// 		const user = ""
// 	}
// }
module.exports = { handleSignup, handleSignIn, getUserData, updateUser, deleteUser }