import { makeGraphQLRequest } from '../helpers/api';
import { SignInFormData } from '../pages/SignIn';

const SIGN_IN_MUTATION = `
  mutation login ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
    token 
    user {
      id
      email
    }
    }
  }
`;

const SignInComponent = {
  handleSubmit: async (data: SignInFormData) => {
    const variables = {
      email: data.email,
      password: data.password,
    };

    try {
      const result = await makeGraphQLRequest(SIGN_IN_MUTATION, variables);
      if (result.errors) {
        console.error(result.errors[0].message);
        alert(`Error:${result.errors[0].message}`);
      } else {
        const {token} = result.data.login
        console.log('User logged in:', result.data.login);
        alert('User successfully logged in!');

        localStorage.setItem('token', token);
        alert('User successfully logged in!');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in.');
    }
  },
};

export default SignInComponent;
