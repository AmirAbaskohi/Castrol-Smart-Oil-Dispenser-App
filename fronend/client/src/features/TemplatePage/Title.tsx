import { Link } from 'react-router-dom';

import styles from './Title.module.css';

import backIcon from '../../icons/back.svg';
import nextIcon from '../../icons/next.svg';

interface TitleProps {
  title: string;
  showBackButton: boolean;
  showNextButton: boolean;
  backPath?: string;
  handleBack: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  handleNext?: () => void;
}

const renderBack = (showButton: boolean, backPath: string, handleBack: (event: React.MouseEvent<HTMLAnchorElement>) => void) =>
  showButton ? <Link to={backPath} onClick={(e) => handleBack(e)}><img src={backIcon} alt="back" className={styles.back} /></Link > : <div className={styles.placeholderBack} />;

const renderNext = (showButton: boolean, handleNext?: () => void) =>
  showButton ? <img src={nextIcon} onClick={() => handleNext?.()} alt="next" className={styles.next} /> : <div className={styles.placeholderNext} />;

export const Title = ({ showBackButton = false, showNextButton = false, backPath = '/', handleBack, handleNext, title }: TitleProps) =>
(<div className={styles.content}>
  {renderBack(showBackButton, backPath, handleBack)}
  <div className={styles.title}>{title}</div>
  {renderNext(showNextButton, handleNext)}
</div>);