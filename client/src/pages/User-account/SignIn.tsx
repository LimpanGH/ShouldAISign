import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SignInComponent from './signInComponent';
import classes from './SignIn.module.css';

export type SignInFormData = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignInFormData>();
  const navigate = useNavigate();

  const { handleSubmit: signInHandler } = SignInComponent();

  const onSubmit = async (data: SignInFormData) => {
    const emailLowerCase = data.email.toLowerCase();
    setValue('email', emailLowerCase);

    const result = await signInHandler({ ...data, email: emailLowerCase });
    if (result && typeof result !== 'boolean') {
      localStorage.setItem('token', result.token);
      navigate('/eula-checker');
    }
  };

  const navigateToCreateAccount = () => {
    navigate('/signup');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div className={classes['wrapper']}>
      {!isLoggedIn && (
        <div className={classes['signin-container']}>
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
                type='password'
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
            
            <button
              type='button'
              className={classes['sign-up-button']}
              onClick={navigateToCreateAccount}
            >
              Or Sign Up
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
