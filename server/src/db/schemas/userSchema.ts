console.log('Reading userSchema.ts');

import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLID } from 'graphql';
import { UserModel, TaskModel } from '../models/userModels';
import { TaskType } from './taskSchema';
import userResolvers from '../controllers/userResolvers';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    // password: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: userResolvers.User.tasks,
    },
  }),
});

// console.log(UserType.getFields());

const LoginType = new GraphQLObjectType({
  name: 'Login',
  fields: {
    token: { type: GraphQLString },
    user: { type: UserType }, // Assuming UserType is already defined
  },
});

// console.log(LoginType.getFields());

// const fields = LoginType.getFields();
// console.log(fields.token);

export const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: userResolvers.Query.user,
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: userResolvers.Query.users,
    },
    task: {
      type: TaskType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: userResolvers.Query.task,
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login: {
      // type: UserType, 
      // type: GraphQLString, //! could this fix my problem in graphql-shield?
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
    deleteUsers: {
      type: new GraphQLList(UserType),
      args: {
        ids: { type: new GraphQLList(GraphQLString) },
      },
      resolve: userResolvers.Mutation.deleteUsers,
    },
  },
});

// console.log(RootQuery.getFields());

export const schemaUser = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

