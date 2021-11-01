import styles from './KeyboardKey.module.css';

interface KeyboardProps {
  text: string;
  isSpecial?: boolean;
  isSpace?: boolean;
  onClick: (text: string) => void;
}

export const KeyboardKey = ({ text, isSpecial = false, isSpace = false, onClick }: KeyboardProps) => {
  let classStyle = styles.content;

  if (isSpecial) {
    classStyle += ' ' + styles.special;
  } else if (isSpace) {
    classStyle += ' ' + styles.space;
  }

  return <div className={classStyle} onClick={() => onClick(text)}>{text}</div>
}
