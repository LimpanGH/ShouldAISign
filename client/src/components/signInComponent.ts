// import { makeGraphQLRequest } from '../helpers/api';
// import { SignInFormData } from '../pages/SignIn';
// import { AuthEvents } from './NavBar';

// const SIGN_IN_MUTATION = `
//   mutation login ($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//     token
//     user {
//       id
//       email
//     }
//     }
//   }
// `;

// const SignInComponent = {
//   handleSubmit: async (data: SignInFormData) => {
//     const variables = {
//       email: data.email,
//       password: data.password,
//     };

//     try {
//       const result = await makeGraphQLRequest(SIGN_IN_MUTATION, variables);
//       if (result.errors) {
//         console.error(result.errors[0].message);
//         alert(`Error:${result.errors[0].message}`);
//         return false;
//       } else {
//         const { token } = result.data.login;
//         console.log('User logged in:', result.data.login);
//         // alert('User successfully logged in!');

//         localStorage.setItem('token', token);
//         AuthEvents.emit(true);
//         alert('User successfully logged in!');
//         return true;
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//       alert('An error occurred while logging in.');
//       return false;
//     }
//   },
// };

// export default SignInComponent;

import { makeGraphQLRequest } from '../helpers/api';
import { SignInFormData } from '../pages/User-account/SignIn';
import { AuthEvents } from './NavBar/NavBar';

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
  handleSubmit: async (
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
        AuthEvents.emit(true);
        alert('User successfully logged in!');

        return { token }; // Return the token instead of true
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in.');
      return false;
    }
  },
};

export default SignInComponent;
