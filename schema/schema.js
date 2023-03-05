const { GraphQLSchema } = require('graphql')
const { RootQuery, mutation } = require('./query')

module.exports = new GraphQLSchema({ query: RootQuery, mutation })
