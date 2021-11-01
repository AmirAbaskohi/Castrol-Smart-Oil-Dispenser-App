import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";

import castrolLogo from '../../icons/castrol-logo.svg';
import contactless from '../../icons/contactless.svg';

import styles from './RfidLogin.module.css';

export const RfidLogin = () => {
  const history = useHistory();

  const goToLogin = () => history.push("/login");

  return (
    <div className={styles.loginCard}>
      <img src={castrolLogo} alt='contactless' className={styles.castrolLogo} onClick={goToLogin} />
      <img src={contactless} alt='contactless' className={styles.contactless} />
    </div >
  )
}
export default withRouter(RfidLogin);