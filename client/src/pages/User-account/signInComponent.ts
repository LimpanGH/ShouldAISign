import { useAuth } from '../../helpers/AutContext';
import { makeGraphQLRequest } from '../../helpers/api';
import { SignInFormData } from '../User-account/SignIn';

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

const SignInComponent = () => {
  const { login } = useAuth();
  const handleSubmit = async (
    data: SignInFormData
  ): Promise<{ token: string } | false> => {
    const variables = {
      email: data.email,
      password: data.password,
    };

    try {
      const result = await makeGraphQLRequest(SIGN_IN_MUTATION, variables);
      if (result.errors) {
        console.error(result.errors[0].message);
        alert(`Error: ${result.errors[0].message}`);
        return false;
      } else {
        const { token } = result.data.login;
        console.log('User logged in:', result.data.login);
        localStorage.setItem('token', token);
        login(token);
        alert('User successfully logged in!');
        return { token }; // Return the token for further use
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in.');
      return false;
    }
  };
  return { handleSubmit };
};

export default SignInComponent;
