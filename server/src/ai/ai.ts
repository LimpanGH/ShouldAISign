import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// const APIkey = process.env.OPENAI_API_KEY;
const APIkey = "";

if (!APIkey) {
  throw new Error('Missing OpenAI API key in environment variables');
}

const openai = new OpenAI({
  apiKey: APIkey,
  dangerouslyAllowBrowser: true,
});

export async function getAIResponse() {
  const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: 'What is airpods?' }],
      // model: 'gpt-3.5-turbo',
      model: 'gpt-4-turbo',  });

  console.log(completion.choices[0]);
}

getAIResponse();



