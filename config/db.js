const mongoose = require('mongoose')

const connectDB = async () => {
	const conn = await mongoose.connect(
		`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.w4bfh8p.mongodb.net/?retryWrites=true&w=majority`,
	)
	console.log(`mongoDB connected: ${conn.connection.host}`)
}

module.exports = connectDB
