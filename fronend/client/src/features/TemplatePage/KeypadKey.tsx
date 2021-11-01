import styles from './KeypadKey.module.css';

interface KeypadProps {
  text: string;
  isSpecial?: boolean;
  isEnter?: boolean;
  onClick: (text: string) => void;
}

export const KeypadKey = ({ text, isSpecial = false, isEnter = false, onClick }: KeypadProps) => {
  let classStyle = styles.content;

  if (isSpecial) {
    classStyle += ' ' + styles.special;
  } else if (isEnter) {
    classStyle += ' ' + styles.enter;
  }

  return <div className={classStyle} onClick={() => onClick(text)}>{text}</div>
}
