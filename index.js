const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors({
	origin: "*"
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
	.then(() => console.log("Connected to db"))
	.catch((err) => console.log(err))


const JobRouter = require('./Routes/Job');
app.use('/job', JobRouter)

const UserRouter = require('./Routes/User');
app.use('/user', UserRouter)


app.get('/', (req, res) => {
	res.send("Hello World!");
})


app.listen(process.env.PORT || 5000, () => {
	console.log("Freelancing app listining: http://localhost:5000")
})