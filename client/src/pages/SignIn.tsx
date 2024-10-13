import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SignInComponent from '../components/signInComponent';
import '../css/SignIn.css';

export type SignInFormData = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const navigate = useNavigate();

  const onSubmit = async (data: SignInFormData) => {
    // await SignInComponent.handleSubmit(data);
    const success = await SignInComponent.handleSubmit(data);
    if (success) {
      navigate('/eula-checker');
    }
  };

  return (
    <>
      <div className='signin-container'>
        <div className='signin-header'>
          <h1>Sign In</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='signin-form'>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              className={`form-input ${errors.email ? 'input-error' : ' '}`}
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
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <span className='error-message'>{errors.password.message}</span>
            )}
          </div>
          <button type='submit' className='submit-button'>
            Sign In
          </button>
        </form>
      </div>
    </>
  );
};

// export default SignIn;
