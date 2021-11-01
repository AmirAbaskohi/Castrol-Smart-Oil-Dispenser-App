import { useState } from 'react';
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { userLogin, clearError, userAuthState } from '../user/userSlice';

import castrolLogo from '../../icons/castrol-logo.svg';

import styles from './CredentialsLogin.module.css';

export const CredentialsLogin = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const store = useAppSelector(userAuthState) as any;

  const handleChange = (e: any) => {
    const { id, value } = e.target

    dispatch(clearError());

    setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleShowHide = (e: any) => setIsRevealPwd(prevState => !prevState);

  const goToRfidLogin = () => history.push("/");

  const handleSubmitClick = (e: any) => {
    e.preventDefault();

    const payload = {
      "name": state.email,
      "password": state.password
    };

    dispatch(userLogin({ user: payload }))
      .then(user => {
        const userDetails = user.payload || {};
        if (userDetails.name && userDetails.id) {
          history.push("/home");
        }
      });
  };

  const errorClass = store.error ? styles.error : styles.error + ' ' + styles.hide;
  const errorMessage = 'User or password incorrect';

  return (
    <div className={styles.loginCard}>
      <form>
        <img src={castrolLogo} alt='castrol-logo' className={styles.castrolLogo} onClick={goToRfidLogin} />
        <div className={errorClass}>{errorMessage}</div>
        <div className="form-group text-left">
          <input type="email"
            className={styles.formInput}
            id="email"
            aria-describedby="emailHelp"
            placeholder="Username"
            value={state.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <input
            type={isRevealPwd ? "text" : "password"}
            className={styles.formInput}
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
          <span onClick={handleShowHide} className={styles.passwordIcon}>
            {state.password.length > 0 && isRevealPwd ? 'Hide' : 'Show'}</span>
        </div>
        <div>
          <button
            type="submit"
            className={styles.logInButton}
            onClick={handleSubmitClick}>Log In</button>

        </div>
      </form>
    </div>
  )
}
export default withRouter(CredentialsLogin);