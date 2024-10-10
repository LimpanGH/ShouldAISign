console.log('Reading index.ts');

import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { connectToDB } from './db/dbConnect';
import { graphqlHTTP } from 'express-graphql';
import { schemaUser } from './db/schemas/userSchema';
import { schemaEula } from './db/schemas/eulaSchema';
import { mergeSchemas } from '@graphql-tools/schema';
import jwt from 'jsonwebtoken';
import { getAIResponse } from './db/ai';
import { aiSchema } from './db/schemas/aiSchema';

dotenv.config();
const mongodbUri = process.env.MONGODB_URI;
const port = process.env.PORT;

const app = express();
app.use(express.json());

if (!mongodbUri) {
  throw new Error('MONGODB_URI is not defined in the environment variables.');
}
if (!process.env.JWT_SECRET_KEY) {
  throw new Error(
    'JWT_SECRET_KEY is not defined in the environment variables.'
  );
}
connectToDB(mongodbUri);
const schema = mergeSchemas({
  schemas: [schemaUser, schemaEula, aiSchema],
});

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(async (req, res, next) => {
  if (req.path === '/graphql') {
    // Handle GraphQL requests
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    let decodedToken = null;
    if (token) {
      try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY || '');
      } catch (err) {
        console.log('Invalid or expired token');
      }
    }
console.log('tjoflöjt');

    graphqlHTTP({
      schema: schema,
      graphiql: true,
      context: { user: decodedToken },
    })(req, res); // Call the graphqlHTTP middleware
  } else if (req.path === '/ai') {
    // Handle AI requests
    try {
      const question = req.query.question as string;

      if (!question) {
        return res.status(400).send('Please provide a question');
      }

      const aiResponse = await getAIResponse(question);
      res.json(aiResponse);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    next(); // For other routes, continue to next middleware
  }
});

// app.use(
//   '/graphql',
//   graphqlHTTP((req, res) => {
//     const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
//     let decodedToken = null;
//     if (token) {
//       try {
//         decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY || '');
//       } catch (err) {
//         console.log('Invalid or expired token');
//       }
//     }
//     return {
//       schema: schema,
//       graphiql: true,
//       // context: { user: decodedToken || null},
//       context: { user: decodedToken },
//     };
//   })
// );

// app.get('/ai', async (req, res) => {
//   try {
//     const question = req.query.question as string;

//     if(!question) {
//       return res.status(400).send('Please provide a question');
//     }

//     const aiResponse = await getAIResponse(question);
//     res.json(aiResponse);
//   } catch (error) {
//     console.error('Error fetching AI response:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
