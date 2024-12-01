console.log('Reading eulaSchema.ts');

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql';
import { eulaResolvers } from '../controllers/eulaResolvers';

export const EulaType = new GraphQLObjectType({
  name: 'Eula',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    assignedTo: { type: GraphQLID },
    createdAt: { type: GraphQLString },
    finishedBy: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getEulaByEulaId: {
      type: EulaType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: eulaResolvers.Query.getEulaByEulaId,
    },
    getAllEulas: {
      type: new GraphQLList(EulaType),
      resolve: eulaResolvers.Query.getAllEulas,
    },
    getEulasAssignedToUserId: {
      type: new GraphQLList(EulaType),
      args: {
        assignedTo: { type: GraphQLID },
      },
      resolve: eulaResolvers.Query.getEulasAssignedToUserId,
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addEula: {
      type: EulaType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        assignedTo: { type: GraphQLID },

      },
      resolve: eulaResolvers.Mutation.addEula,
    },
    addEulaToUserId: {
      type: EulaType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        assignedTo: { type: GraphQLID },
      },
      resolve: eulaResolvers.Mutation.addEulaToUserId,
    },
    deleteEula: {
      type: EulaType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: eulaResolvers.Mutation.deleteEula,
    },
  },
});

export const schemaEula = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
