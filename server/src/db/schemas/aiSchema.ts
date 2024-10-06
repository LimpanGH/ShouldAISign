import { GraphQLString, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { getAIResponse } from '../../ai/ai';
import { AiModel } from '../models/aiModels';

export const aiResponseType = new GraphQLObjectType({
    name: 'AIResponse',
    fields: {
      response: { type: GraphQLString },
    },
  });

// Define the Mutation for AI Response
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    aiResponse: {
      type: aiResponseType, // Return type is a String (AI response)
      args: {
        question: { type: GraphQLString }, // Input argument
      },
      resolve: async (_: any, args: { [key: string]: any }) => {
        try {
          // Extract the question from args
          const question = args.question;

          // Get AI Response
          const response = await getAIResponse(question);

          // Save the question and AI response to the database
          await AiModel.create({
            userQuery: question,
            aiResponse: response,
          });

          return {response}; // Return the AI's response
        } catch (error) {
          throw new Error('Error fetching AI response');
        }
      },
    },
  },
});

// Export the complete schema
export const aiSchema = new GraphQLSchema({
  mutation: Mutation, // Attach the mutation to the schema
});
