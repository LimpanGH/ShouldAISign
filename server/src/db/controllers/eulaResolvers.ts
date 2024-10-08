console.log('Reading eulaResolvers.ts');

import { EulaModel } from '../models/eulaModels';
import { checkAuth } from '../helpers/authHelpers';

interface EulaArgs {
  id?: string;
}
interface AddEulaArgs {
  id: string;
}

interface Context {
  user?: string | null;
}

interface AssignedEulasArgs {
  assignedTo?: string;
}

export const eulaResolvers = {
  Query: {
    getEulaByEulaId: async (_: any, args: EulaArgs, context: Context) => {
      checkAuth(context);
      if (!args.id || typeof args.id !== 'string' || args.id.trim() === '') {
        throw new Error('EULA ID is required and must be a non-empty string');
      }
      const eula = await EulaModel.findById(args.id);
      if (!eula) {
        throw new Error(`EULA with ID ${args.id} not found`);
      }
      return EulaModel.findById(args.id);
    },

    getAllEulas: async (_: any, args: EulaArgs, context: Context) => {
      checkAuth(context);
      const eulas = await EulaModel.find({});
      if (eulas.length === 0) {
        throw new Error('No EULAs found in the database');
      }
      return EulaModel.find({});
    },

    getEulasAssignedToUserId: (
      _: any,
      args: AssignedEulasArgs,
      context: Context
    ) => {
      checkAuth(context);
      if (
        !args.assignedTo ||
        typeof args.assignedTo !== 'string' ||
        args.assignedTo.trim() === ''
      ) {
        throw new Error('User ID is required');
      }
      return EulaModel.find(
        args.assignedTo ? { assignedTo: args.assignedTo } : {}
      );
    },
  },
  Mutation: {
    addEula: async (_: any, args: { [key: string]: any }, context: Context) => {
      console.log('Context user:', context.user); // Log the context user
      checkAuth(context);
      const eula = new EulaModel({
        title: args.title,
        description: args.description,
        status: args.status,
        createdAt: new Date().toISOString(),
      });
      return eula.save();
    },
    addEulaToUserId: async (
      _: any,
      args: { [key: string]: any },
      context: Context
    ) => {
      console.log('Context user:', context.user);
      checkAuth(context);
      if (!args.id) {
        throw new Error('User ID is required');
      }
      const eula = new EulaModel({
        title: args.title,
        description: args.description,
        status: args.status,
        assignedTo: args.assignedTo,
        createdAt: new Date().toISOString(),
      });
      return eula.save();
    },

    deleteEula: async (
      _: any,
      args: { [key: string]: any },
      context: Context
    ) => {
      checkAuth(context);
      const eulaToDelete = await EulaModel.findById(args.id);
      if (!eulaToDelete) {
        throw new Error(`EULA with ID ${args.id} not found`);
      }
      const { id } = args as AddEulaArgs;
      const deletedEula = await EulaModel.findByIdAndDelete(args.id);
      return deletedEula;
    },
  },
};
