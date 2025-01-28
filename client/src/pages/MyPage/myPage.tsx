import { makeGraphQLRequest } from '../../helpers/api';

import { useState } from 'react';
import { useAuth } from '../../helpers/AutContext'; // Import useAuth
import styles from './MyPage.module.css'; // Import the CSS module

const MyPage = () => {
  const { isAuthenticated, user } = useAuth(); // Access auth state

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const changePasswordMutation = `
    mutation changePassword($userId: ID!, $currentPassword: String!, $newPassword: String!) {
    changePassword(userId: $userId, currentPassword: $currentPassword, newPassword: $newPassword) {
    id
    name
    email
    }
    }
    `;

    const variables = {
      userId: user?.userId, //! bara id ?
      currentPassword,
      newPassword,
    };

    try {
      //   const response = await fetch('/graphql', {
      const result = await makeGraphQLRequest(
        changePasswordMutation,
        variables
      );

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      //   const { data, errors } = await response.json();

      setSuccessMessage(result.data.changePasswordMutation.message);
      setErrorMessage('');
    } catch (error: unknown) {
      setSuccessMessage('');
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An error occurred');
      }
    }
  };

  console.log(user);

  return (
    <div className={styles['my-page-container']}>
      <section>
        <div className={styles['page-content']}>
          {isAuthenticated ? (
            <div className={styles['user-name']}>{user?.name || 'My Page'}</div>
          ) : (
            <div className={styles['not-authenticated-message']}>
              Please sign in to view your page
            </div>
          )}
        </div>

        <div className={styles['page-content']}>
          {isAuthenticated ? (
            <div className={styles['user-id']}>{user?.email || 'My Page'}</div>
          ) : (
            <div className={styles['not-authenticated-message']}>
              Please sign in to view your page
            </div>
          )}
        </div>

        <div className={styles['page-content']}>
          {isAuthenticated ? (
            <div className={styles['user-id']}>{user?.userId || 'My Page'}</div>
          ) : (
            <div className={styles['not-authenticated-message']}>
              Please sign in to view your page
            </div>
          )}
        </div>

        <div>
          {isAuthenticated && (
            <div className={styles['change-password-container']}>
              <h2>Change password</h2>
              <form
                onSubmit={handleChangePassword}
                className={styles['change-password-form']}
              >
                <div>
                  <label htmlFor='currentPassword'>Current Password</label>
                  <input
                    type='password'
                    id='currentPassword'
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor='newPassword'>New Password</label>
                  <input
                    type='password'
                    id='newPassword'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <button type='submit'>Update password</button>
              </form>
              {successMessage && (
                <p className={styles['success-message']}>{successMessage}</p>
              )}
              {errorMessage && (
                <p className={styles['error-message']}>{errorMessage}</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyPage;
