import { KeyboardKey } from './KeyboardKey';

import styles from './AlphabetKeyboard.module.css';

interface AlphabetKeyboardProps {
  onKeyPress: (text: string) => void;
}

export const AlphabetKeyboard = (props: AlphabetKeyboardProps) => {

  return (<div className={styles.content}>
    <div className={styles.row}>
      <KeyboardKey text='Q' onClick={props.onKeyPress} />
      <KeyboardKey text='W' onClick={props.onKeyPress} />
      <KeyboardKey text='E' onClick={props.onKeyPress} />
      <KeyboardKey text='R' onClick={props.onKeyPress} />
      <KeyboardKey text='T' onClick={props.onKeyPress} />
      <KeyboardKey text='Y' onClick={props.onKeyPress} />
      <KeyboardKey text='U' onClick={props.onKeyPress} />
      <KeyboardKey text='I' onClick={props.onKeyPress} />
      <KeyboardKey text='O' onClick={props.onKeyPress} />
      <KeyboardKey text='P' onClick={props.onKeyPress} />
    </div>
    <div className={styles.row}>
      <KeyboardKey text='A' onClick={props.onKeyPress} />
      <KeyboardKey text='S' onClick={props.onKeyPress} />
      <KeyboardKey text='D' onClick={props.onKeyPress} />
      <KeyboardKey text='F' onClick={props.onKeyPress} />
      <KeyboardKey text='G' onClick={props.onKeyPress} />
      <KeyboardKey text='H' onClick={props.onKeyPress} />
      <KeyboardKey text='J' onClick={props.onKeyPress} />
      <KeyboardKey text='K' onClick={props.onKeyPress} />
      <KeyboardKey text='L' onClick={props.onKeyPress} />
    </div>
    <div className={styles.row}>
      <KeyboardKey text='123' isSpecial={true} onClick={props.onKeyPress} />
      <KeyboardKey text='Z' onClick={props.onKeyPress} />
      <KeyboardKey text='X' onClick={props.onKeyPress} />
      <KeyboardKey text='C' onClick={props.onKeyPress} />
      <KeyboardKey text='V' onClick={props.onKeyPress} />
      <KeyboardKey text='B' onClick={props.onKeyPress} />
      <KeyboardKey text='N' onClick={props.onKeyPress} />
      <KeyboardKey text='M' onClick={props.onKeyPress} />
      <KeyboardKey text='DEL' isSpecial={true} onClick={props.onKeyPress} />
    </div>
  </div>);
}