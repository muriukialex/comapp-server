const express = require('express')
const app = express()
const { graphqlHTTP } = require('express-graphql')
require('dotenv').config()
const PORT = process.env.PORT || 5001
const schema = require('./schema/schema')
const connectDB = require('./config/db')

connectDB()

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: process.env.NODE_ENV !== 'production',
	}),
)

app.use('*', (req, res) => {
	res.status(404).send('Ooops!')
})

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))
