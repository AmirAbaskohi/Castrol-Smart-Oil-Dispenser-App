import { useState } from 'react';

import { NumericKeypad } from './NumericKeypad';

import styles from './SelectOilQuantity.module.css';

interface SelectOilQuantityProp {
  type: string;
  recommendedQuantity: string;
  handleDone: (adjustedQuantity: string) => void;
}

export const SelectOilQuantity = (props: SelectOilQuantityProp) => {
  const [value, setValue] = useState(props.recommendedQuantity);
  const [showError, setShowError] = useState(false);

  const errorClass = showError ? styles.error : styles.error + ' ' + styles.hide;
  const errorMessage = 'Value must be grater than 0';

  const MAX_QUANTITY = 99.99;

  const handleKeyPress = (keyValue: string) => {
    setShowError(false);

    if (keyValue === 'ENTER') {
      if (!value || Number(value) === 0) {
        setShowError(true);
        return;
      }
      props.handleDone(value);
    } else if (keyValue === 'DEL') {
      if (value === '') return;
      setValue(value.slice(0, -1));
    } else if (keyValue === '.') {
      if (value.includes('.')) return;
      setValue(value + keyValue);
    } else {
      const newValue = value + keyValue;
      if (Number(newValue) > MAX_QUANTITY) return;

      if (value.includes('.')) {
        const decimalPart = newValue.split('.')[1];
        if (decimalPart.length > 2) return;
      }

      setValue(newValue);
    }
  }

  return <div className={styles.text}>
    <div className={styles.type}>Type: {props.type}</div>
    <div className={styles.quantityRow}>
      <div className={styles.quantityLable}>Quantity:</div>
      <div className={styles.quantityInput}>{value || 0}</div>
    </div>
    <div className={errorClass}>{errorMessage}</div>
    <NumericKeypad onKeyPress={handleKeyPress} />
  </div>;
}




