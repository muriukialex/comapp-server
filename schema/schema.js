const { GraphQLSchema } = require('graphql')
const { RootQuery, mutation } = require('./queryTypes')

module.exports = new GraphQLSchema({ query: RootQuery, mutation })
