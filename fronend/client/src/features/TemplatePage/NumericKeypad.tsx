import { KeypadKey } from './KeypadKey';

import styles from './NumericKeypad.module.css';

interface NumericKeypadProps {
  onKeyPress: (text: string) => void;
}

export const NumericKeypad = (props: NumericKeypadProps) => {

  return (<div className={styles.content}>
    <div>
      <div className={styles.row}>
        <KeypadKey text='1' onClick={props.onKeyPress} />
        <KeypadKey text='2' onClick={props.onKeyPress} />
        <KeypadKey text='3' onClick={props.onKeyPress} />
      </div>
      <div className={styles.row}>
        <KeypadKey text='4' onClick={props.onKeyPress} />
        <KeypadKey text='5' onClick={props.onKeyPress} />
        <KeypadKey text='6' onClick={props.onKeyPress} />
      </div>
      <div className={styles.row}>
        <KeypadKey text='7' onClick={props.onKeyPress} />
        <KeypadKey text='8' onClick={props.onKeyPress} />
        <KeypadKey text='9' onClick={props.onKeyPress} />
      </div>
      <div className={styles.row}>
        <KeypadKey text='.' isSpecial={true} onClick={props.onKeyPress} />
        <KeypadKey text='0' onClick={props.onKeyPress} />
        <KeypadKey text='DEL' isSpecial={true} onClick={props.onKeyPress} />
      </div>
    </div>
    <KeypadKey text='ENTER' isEnter={true} onClick={props.onKeyPress} />
  </div>);
}