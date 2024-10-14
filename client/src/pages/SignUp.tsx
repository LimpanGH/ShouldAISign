import { useForm } from 'react-hook-form';
import SignUpComponent from '../components/signUpComponent';
import classes from '../css/SignUp.module.css';

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
    <div className={classes['signup-container']}>
      {' '}
      <div className={classes['signup-header']}>
        <h1>Sign Up</h1>
        <a href='/'>Home</a>
        <a href='/eula-Checker'>EULA Checker</a>
        <a href='/signin'>Sign In</a>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes['signup-form']}
      >
        <div className={classes['form-group']}>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            className={`${classes['form-input']} ${
              errors.name ? classes['input-error'] : ''
            }`}
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <span className={classes['error-message']}>
              {errors.name.message}
            </span>
          )}
        </div>

        <div className={classes['form-group']}>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            className={`${classes['form-input']} ${
              errors.email ? classes['input-error'] : ''
            }`}
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && (
            <span className={classes['error-message']}>
              {errors.email.message}
            </span>
          )}
        </div>

        <div className={classes['form-group']}>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            className={`${classes['form-input']} ${
              errors.password ? classes['input-error'] : ''
            }`}
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <span className={classes['error-message']}>
              {errors.password.message}
            </span>
          )}
        </div>

        <button type='submit' className={classes['submit-button']}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
