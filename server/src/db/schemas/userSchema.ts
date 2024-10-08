console.log('Reading userSchema.ts');

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  graphql,
} from 'graphql';
import { UserModel, EulaModel } from '../models/userModels';
import { EulaType } from './eulaSchema';
import userResolvers from '../controllers/userResolvers';
import { title } from 'process';
import { aiSchema } from './aiSchema';
import { getAIResponse } from '../ai';
import { aiResponseType } from './aiSchema';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    // password: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(EulaType),
      resolve: userResolvers.User.tasks,
    },
  }),
});

// console.log(UserType.getFields());

const LoginType = new GraphQLObjectType({
  name: 'Login',
  fields: {
    token: { type: GraphQLString },
    user: { type: UserType },
  },
});

// const aiResponseType = new GraphQLObjectType({
//   name: 'AIResponse',
//   fields: {
//     response: { type: GraphQLString },
//   },
// });

// console.log(LoginType.getFields());

// const fields = LoginType.getFields();
// console.log(fields.token);

export const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getUserById: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: userResolvers.Query.getUserById,
    },
    getAllUsers: {
      type: new GraphQLList(UserType),
      resolve: userResolvers.Query.getAllUsers,
    },
    getTaskByUserId: {
      type: new GraphQLList(EulaType),
      args: {
        id: { type: GraphQLID },
      },
      resolve: userResolvers.Query.getTaskByUserId,
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login: {
      type: LoginType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: userResolvers.Mutation.login,
    },
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },

      resolve: userResolvers.Mutation.addUser,
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: userResolvers.Mutation.deleteUser,
    },
    deleteMultipleUsers: {
      type: new GraphQLList(UserType),
      args: {
        ids: { type: new GraphQLList(GraphQLString) },
      },
      resolve: userResolvers.Mutation.deleteMultipleUsers,
    },
    aiResponse: {
      type: aiResponseType,
      args: {
        question: { type: GraphQLString },
      },
      // resolve: async (_: any, args: { question: string }) => {
      resolve: async (_: any, args: { [question: string]: any }) => {
        try {
          const responseText = await getAIResponse(args.question);
          console.log('AI Response:', responseText);

          return { response: responseText }; // Return the response in the expected format
        } catch (error) {
          console.error('Error fetching AI response:', error);
          throw new Error('Error fetching AI response');
        }
      },
    },
  },
});

// console.log(RootQuery.getFields());

export const schemaUser = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
