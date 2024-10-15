import { GraphQLString, GraphQLObjectType, GraphQLSchema, GraphQLInt } from 'graphql';
import { getAIResponse } from '../ai';
import { AiModel } from '../models/aiModels';

export const aiResponseType = new GraphQLObjectType({
  name: 'AIResponse',
  fields: {
    response: { type: GraphQLString },
    reasonablenessScore: { type: GraphQLInt },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    aiResponse: {
      type: aiResponseType,
      args: {
        question: { type: GraphQLString },
      },
      resolve: async (_: any, args: { [key: string]: any }) => {
        try {
          const question = args.question;
          const response = await getAIResponse(question);

          function calculateReasonableness(response: string): number {
            if (response.toLowerCase().includes("unfair")) {
              return 30;
            } else if (response.toLowerCase().includes("fair")) {
              return 80;
            }
            return 50;
          }

          if (response === null) {
            // Handle null response, e.g., return a default value
            return {
              response: "No response received from AI.",
              reasonablenessScore: 0, // or any default speed value
            };
          }

          const reasonablenessScore = calculateReasonableness(response); // Store as number

          await AiModel.create({
            userQuery: question,
            aiResponse: response,
            speed: reasonablenessScore.toString(), // You can store this if needed
          });

          return { response, reasonablenessScore };
        } catch (error) {
          console.error('Error in AI response mutation:', error);
          throw new Error('Error fetching AI response');
        }
      },
    },
  },
});

export const aiSchema = new GraphQLSchema({
  mutation: Mutation,
});
