import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
} from 'graphql';
import { getAIResponse } from '../ai';
import { AiModel } from '../models/aiModels';

export const aiResponseType = new GraphQLObjectType({
  name: 'AIResponse',
  fields: {
    response: { type: GraphQLString },
    reasonablenessScore: { type: GraphQLInt },
  },
});

function calculateReasonableness(response: string): number {
  const lowerResponse = response.toLowerCase();
  console.log('Lower response:', lowerResponse);
  let score = 50; // Default moderate score

  if (
    lowerResponse.includes('horrible') ||
    lowerResponse.includes('terrible') ||
    lowerResponse.includes('bad') ||
    lowerResponse.includes('invasive')
  ) {
    score -= 50; // Strong negative sentiment
    console.log(1111);
  }
  if (
    lowerResponse.includes('unfair') ||
    lowerResponse.includes('problematic')
  ) {
    score -= 30; // Moderate negative sentiment
    console.log(2222);
  }
  if (
    lowerResponse
      .split(' ')
      .find((string) => string === 'fair' || string === 'reasonable')
  ) {
    score += 30; // Moderate positive sentiment
    console.log(3333);
  }
  if (lowerResponse.includes('very fair')) {
    score += 10; // Strong positive sentiment
    console.log(4444);
  }
  if (lowerResponse.includes('very unfair')) {
    score -= 10; // Slightly strong negative sentiment
    console.log(5555);
  }
  console.log(lowerResponse);
  // Clamp the score between 0 and 100
  return Math.max(0, Math.min(score, 100));
}

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
          console.log('AI resonse:', response);

          if (response === null) {
            return {
              response: 'No response received from AI.',
              reasonablenessScore: 0,
            };
          }

          const reasonablenessScore = calculateReasonableness(response);
          console.log('Calculated Reasonableness Score:', reasonablenessScore);

          await AiModel.create({
            userQuery: question,
            aiResponse: response,
            reasonablenessScore: reasonablenessScore.toString(),
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
