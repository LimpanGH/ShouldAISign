export const makeGraphQLRequest = async <T>(query: string, variables: T) => {
  const token = localStorage.getItem('token');
  // const apiUrl = 'http://54.221.26.10:4000/graphql'; // Corrected URL
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }


  // const response = await fetch('http://localhost:4000/graphql', {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
};
