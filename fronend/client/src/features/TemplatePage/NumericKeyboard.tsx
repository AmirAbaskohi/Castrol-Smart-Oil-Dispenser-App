import { KeyboardKey } from './KeyboardKey';

import styles from './NumericKeyboard.module.css';

interface NumericKeyboardProps {
  onKeyPress: (text: string) => void;
}

export const NumericKeyboard = (props: NumericKeyboardProps) => {

  return (<div className={styles.content}>
    <div className={styles.row}>
      <KeyboardKey text='0' onClick={props.onKeyPress} />
      <KeyboardKey text='1' onClick={props.onKeyPress} />
      <KeyboardKey text='2' onClick={props.onKeyPress} />
      <KeyboardKey text='3' onClick={props.onKeyPress} />
      <KeyboardKey text='4' onClick={props.onKeyPress} />
      <KeyboardKey text='5' onClick={props.onKeyPress} />
      <KeyboardKey text='6' onClick={props.onKeyPress} />
      <KeyboardKey text='7' onClick={props.onKeyPress} />
      <KeyboardKey text='8' onClick={props.onKeyPress} />
      <KeyboardKey text='9' onClick={props.onKeyPress} />
    </div>
    <div className={styles.row}>
      <KeyboardKey text='ABC' isSpecial={true} onClick={props.onKeyPress} />
      <KeyboardKey text=' ' isSpace={true} onClick={props.onKeyPress} />
      <KeyboardKey text='DEL' isSpecial={true} onClick={props.onKeyPress} />
    </div>
  </div>);
}