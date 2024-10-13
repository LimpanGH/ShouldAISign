import { useForm } from 'react-hook-form';
import SignUpComponent from '../components/signUpComponent';
import '../css/SignUp.css';

export type SignUpFormData = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    await SignUpComponent.handleSubmit(data);
  };

  return (
    <div className='signup-container'>
      <div className='signup-header'>
        <h1>Sign Up</h1>
        <a href='/'>Home</a>
        <a href='/eula-Checker'>EULA Checker</a>
        <a href='/login'>Log In</a>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='signup-form'>
        
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            className={`form-input ${errors.name ? 'input-error' : ''}`}
            {...register('name', { required: 'Name is required' })} // Improved error message
          />
          {errors.name && (
            <span className='error-message'>{errors.name.message}</span> // Use message from the error object
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            className={`form-input ${errors.email ? 'input-error' : ''}`}
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && (
            <span className='error-message'>{errors.email.message}</span>
          )}
        </div>
        
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            className={`form-input ${errors.password ? 'input-error' : ''}`}
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <span className='error-message'>{errors.password.message}</span>
          )}
        </div>

        <button type='submit' className='submit-button'>
          Sign Up
        </button>

      </form>

    </div>
  );
};

export default SignUp;
