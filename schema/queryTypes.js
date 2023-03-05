const {
	GraphQLID,
	GraphQLString,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLEnumType,
	GraphQLList,
	GraphQLSchema,
} = require('graphql')
const { ProjectType, ClientType } = require('./types')
const Client = require('../models/Client')
const Project = require('../models/Project')

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parent, args) {
				return Project.find()
			},
		},
		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Project.findById(args.id)
			},
		},
		clients: {
			type: new GraphQLList(ClientType),
			resolve(parent, args) {
				return Client.find()
			},
		},
		client: {
			type: ClientType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Client.findById(args.id)
			},
		},
	},
})

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addProject: {
			type: ProjectType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				description: { type: new GraphQLNonNull(GraphQLString) },
				status: {
					type: new GraphQLEnumType({
						name: 'ProjectStatus',
						values: {
							new: { value: 'NOT_STARTED' },
							ongoing: { value: 'ONGOING' },
							complete: { value: 'COMPLETED' },
						},
					}),
					defaultValue: 'NOT_STARTED',
				},
				clientId: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				const newProject = new Project({
					name: args.name,
					description: args.description,
					status: args.status,
					clientId: args.clientId,
				})
				return newProject.save()
			},
		},
		deleteProject: {
			type: ProjectType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parent, args) {
				return Project.findByIdAndRemove(args.id)
			},
		},
		updateProject: {
			type: ProjectType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				name: { type: GraphQLString },
				description: { type: GraphQLString },
				status: {
					type: new GraphQLEnumType({
						name: 'ProjectStatusUpdate',
						values: {
							new: { value: 'NOT_STARTED' },
							ongoing: { value: 'ONGOING' },
							complete: { value: 'COMPLETED' },
						},
					}),
				},
				clientId: {
					type: new GraphQLNonNull(GraphQLID),
				},
			},
			async resolve(parent, args) {
				const projectFound = await Project.findById(args.id)
				if (!projectFound) {
					throw new Error('Oops! That project ID does not exist!')
				}
				if (args.clientId) {
					const clientFound = await Client.findById(args.clientId)
					if (!clientFound) {
						throw new Error('Oops! That client ID does not exist!')
					}
				}
				return Project.findByIdAndUpdate(
					args.id,
					{
						$set: {
							name: args.name,
							description: args.description,
							status: args.status,
							clientId: args.clientId,
						},
					},
					{ new: true },
				)
			},
		},
		addClient: {
			type: ClientType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				phone: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				const newClient = new Client({
					name: args.name,
					email: args.email,
					phone: args.phone,
				})
				return newClient.save()
			},
		},
		updateClient: {
			type: ClientType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				phone: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				return Client.findByIdAndUpdate(
					args.id,
					{
						$set: {
							name: args.name,
							email: args.email,
							phone: args.phone,
						},
					},
					{ new: true },
				)
			},
		},
		deleteClient: {
			type: ClientType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parent, args) {
				Projects.find({ clientId: args.id }).then(projects => {
					projects.forEach(project => {
						project.remove()
					})
				})
				return Client.findByIdAndRemove(args.id)
			},
		},
	},
})

module.exports = { RootQuery, mutation }
