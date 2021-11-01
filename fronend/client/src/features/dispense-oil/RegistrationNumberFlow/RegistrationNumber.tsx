import { useState, useEffect } from 'react';

import { AlphabetKeyboard } from '../../TemplatePage/AlphabetKeyboard';
import { NumericKeyboard } from '../../TemplatePage/NumericKeyboard';

import styles from './RegistrationNumber.module.css';

interface RegistrationNumberProp {
  defaultValue: string,
  onValueChange: (value: string) => void
}

export enum KeyboardType {
  Alphabet,
  Numeric,
};

export const RegistrationNumber = ({ defaultValue, onValueChange }: RegistrationNumberProp) => {
  const [value, setValue] = useState('');
  const [keyboardType, setKeyboardType] = useState(KeyboardType.Alphabet);

  useEffect(() => {
    onValueChange(value);
  }, [value, onValueChange]);

  const MAX_LENGTH = 10;

  const handleKeyPress = (keyValue: string) => {
    if (keyValue === 'ABC') {
      setKeyboardType(KeyboardType.Alphabet);
    } else if (keyValue === '123') {
      setKeyboardType(KeyboardType.Numeric);
    } else if (keyValue === 'DEL') {
      if (value === '') return;
      setValue(value.slice(0, -1));
    } else {
      const newValue = value + keyValue;
      if (newValue.length > MAX_LENGTH) return;

      setValue(newValue);
    }
  }

  return <div className={styles.content}>
    <div className={styles.regNumberInput}>{value}</div>
    {keyboardType === KeyboardType.Alphabet && <AlphabetKeyboard onKeyPress={handleKeyPress} />}
    {keyboardType === KeyboardType.Numeric && <NumericKeyboard onKeyPress={handleKeyPress} />}
  </div>;
}