// import * as dotenv from 'dotenv';
import OpenAI from 'openai';

const APIkey = process.env.OPENAI_API_KEY as string;

if (!APIkey) {
  throw new Error('Missing OpenAI API key in environment variables');
}

const openai = new OpenAI({
  apiKey: APIkey,
  dangerouslyAllowBrowser: true,
});

export async function getAIResponse(question: string) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: question }],
    model: 'gpt-3.5-turbo',
    // model: 'gpt-4-turbo',
    
  });

  console.log(completion.choices[0]);
  return completion.choices[0].message.content;
}

// getAIResponse();
