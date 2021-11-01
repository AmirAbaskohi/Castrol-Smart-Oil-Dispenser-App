import { Link } from 'react-router-dom';

import styles from './DonePage.module.css';

import doneIcon from '../../icons/done.svg';

interface DonePageProps {
  type: string;
  dispensedQuantity: string;
  remainingQuantityInBarrel: string;
}

export const DonePage = ({ type, dispensedQuantity, remainingQuantityInBarrel }: DonePageProps) => {
  return <div className={styles.content}>
    <div>Type: {type}</div>
    <div>Dispensed: {dispensedQuantity} L</div>
    <div>Remaining in barrel: {remainingQuantityInBarrel}</div>
    <Link to='/home'><div className={styles.doneIcon}><img src={doneIcon} alt="doneIcon" className={styles.icon} /></div></Link>
  </div>;
}