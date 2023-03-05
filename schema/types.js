const {
	GraphQLID,
	GraphQLEnumType,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
	GraphQLSchema,
} = require('graphql')
const Client = require('../models/Client')

const ProjectType = new GraphQLObjectType({
	name: 'Project',
	fields: () => ({
		id: {
			type: GraphQLID,
		},
		name: {
			type: GraphQLString,
		},
		description: {
			type: GraphQLString,
		},
		status: {
			type: GraphQLString,
		},
		client: {
			type: ClientType,
			resolve(parent, args) {
				return Client.findById(parent.clientId)
			},
		},
	}),
})

const ClientType = new GraphQLObjectType({
	name: 'Client',
	fields: () => ({
		id: {
			type: GraphQLString,
		},
		name: {
			type: GraphQLString,
		},
		email: {
			type: GraphQLString,
		},
		phone: {
			type: GraphQLString,
		},
	}),
})

module.exports = { ProjectType, ClientType }
