import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout, userAuthState } from '../user/userSlice';
import { UserAuth } from '../../types';

import castrolLogo from '../../icons/castrol-logo.svg';
import settingsIcon from '../../icons/settings.svg';
import logoutIcon from '../../icons/logout.svg';

import styles from './Header.module.css';

export const Header = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const store = useAppSelector(userAuthState) as UserAuth;

  const handleEnvironmentButtonClick = (e: any) => history.push('/statistics/environmental');

  const handleLogout = () => dispatch(logout());

  return (
    <div className={styles.header}>
      <Link to='/home'><img src={castrolLogo} alt='castrol-logo' className={styles.castrolLogo} /></Link>
      <div className={styles.rightSection}>
        <div>
          <button className={styles.environmentalButton}
            onClick={handleEnvironmentButtonClick}>Environmental Benefits</button>
        </div>
        <div className={styles.loggedInUser}>Logged-in user: {store.name}</div>
        <Link to='/admin/pump-procedures'><img src={settingsIcon} alt='settings' className={styles.settings} /></Link>
        <img src={logoutIcon} alt='logout' className={styles.logout} onClick={handleLogout} />
      </div>
    </div >
  );
}