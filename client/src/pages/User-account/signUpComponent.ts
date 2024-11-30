import { makeGraphQLRequest } from '../../helpers/api';
import { SignUpFormData } from '../User-account/SignUp';

const ADD_USER_MUTATION = `
  mutation AddUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const SignUpComponent = {
  handleSubmit: async (data: SignUpFormData) => {
    const variables = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const result = await makeGraphQLRequest(ADD_USER_MUTATION, variables);

      if (result.errors) {
        console.error(result.errors[0].message);
        alert(`Error: ${result.errors[0].message}`);
      } else {
        console.log('User added:', result.data.addUser);
        alert('User successfully added!');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('An error occurred while adding the user.');
    }
  },
};

export default SignUpComponent;
