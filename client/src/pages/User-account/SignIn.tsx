import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SignInComponent from '../../components/signInComponent';
import classes from './SignIn.module.css';

// import heroImg from '../assets/eula1.jpeg';

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
    const result = await SignInComponent.handleSubmit(data); // Change here
    if (result && typeof result !== 'boolean') {
      // Check if result is not false
      localStorage.setItem('token', result.token); // Now access token safely
      navigate('/eula-checker');
    }
  };

  const navigateToCreateAccount = () => {
    navigate('/signup');
  };

  // Check if the user is already logged in
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <>
      <div>
        {/* <img src={heroImg} alt='Eula hero image' className={classes['hero']} /> */}
        {/* <div className='primary-bg'>primary-bg</div>
        <div className='secondary-bg'>secondary-bg</div>
        <div className='third-bg'>third-bg</div>
        <div className='fourth-bg'>fourth-bg</div>
        <div className='fifth-bg'>fifth-bg</div>
        <div className='sixth-bg'>sixth-bg</div> */}
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
                  id='password'
                  className={`${classes['form-input']} ${
                    errors.password ? classes['input-error'] : ''
                  }`}
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                {errors.password && (
                  <span className={classes['error-message']}>
                    {errors.password.message}
                  </span>
                )}
              </div>
              {/* <button type='submit' className={classes['submit-button']}> */}
              <button type='submit' className={classes['submit-button']}>
                Sign In
              </button>
              <button
                type='button' // Change to 'button' to prevent form submission
                className={classes['sign-up-button']}
                onClick={navigateToCreateAccount}
              >
                Or Sign Up
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};
