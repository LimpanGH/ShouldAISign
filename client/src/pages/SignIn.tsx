import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SignInComponent from '../components/signInComponent';
import classes from '../css/SignIn.module.css';

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
    const success = await SignInComponent.handleSubmit(data);
    if (success) {
      navigate('/eula-checker');
    }
  };

  return (
    <>
      <div className={classes['signin-container']}>
        {' '}
        <div className={classes['signin-header']}>
          <h1>Sign In</h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes['signin-form']}
        >
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
            Sign In
          </button>
        </form>
      </div>
    </>
  );
};
