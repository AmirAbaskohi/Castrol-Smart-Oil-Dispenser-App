import { useState } from 'react';

import styles from './DispenseOilConfirmationPage.module.css';

interface SelectOilQuantityProp {
  type: string;
  quantity: string;
  onStartClick: () => void;
}

export const DispenseOilConfirmationPage = ({ type, quantity, onStartClick }: SelectOilQuantityProp) => {
  const [startEnabled, setStartState] = useState(true);

  const handleStart = () => {
    setStartState(false);
    onStartClick();
  }

  const startButtonStyle = startEnabled ? styles.startButton : styles.startButton + ' ' + styles.startButtonDisabled;

  return <div className={styles.content}>
    <div className={styles.type}>Type: {type}</div>
    <div className={styles.quantity}>Quantity: {quantity} L</div>
    <button disabled={!startEnabled} className={startButtonStyle} onClick={handleStart}>Start</button>
  </div>;
}



