// import { useState } from 'react'

import { useState } from 'react';
import { request, gql } from 'graphql-request';
import './App.css';

type AIResponseData = {
  aiResponse: {
    response: string;
  };
};

function App() {
  // const [count, setCount] = useState(0)
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async () => {
    const query = gql`
      mutation AuthenticatorResponse($question: String!) {
        aiResponse(question: $question) {
          response
        }
      }
    `;

    try {
      const data = await request<AIResponseData>('http://localhost:4000/graphql', query, {
        question,
      });
      setResponse(data.aiResponse.response);
    } catch (error) {
      console.error('Error fetching AI response', error);
    }
  };

  return (
    <>
      <div>
        <label htmlFor='question'>
          Ställ din fråga
          <input
            type='text'
            value={question}
            onChange={handleInputChange}
            id='question'
          />
        </label>
        <button onClick={handleSubmit}>Skicka</button>
        {response && (
          <div>
            <h2>Svar:</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
