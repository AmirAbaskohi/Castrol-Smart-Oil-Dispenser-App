import styles from './SelectOptionCard.module.css';

interface SelectOptionCardProp {
  id?: string;
  title: string;
  imgSrc: string;
  className: string;
  handleClick: (id: string) => void;
  topCornersRounded?: boolean;
}

export const SelectOptionCard = (props: SelectOptionCardProp) => {
  const { id, title, imgSrc, className, topCornersRounded = true, handleClick } = props;

  const boxClassStyle = topCornersRounded ? styles.box + ' ' + styles.boxAllCornersRounded : styles.box + ' ' + styles.boxNoRoundTopCorners;
  console.log('boxClassStyle====', boxClassStyle);

  return (
    <div id={id} className={styles.card} onClick={() => handleClick(title || '')}>
      <div className={styles.textLink}>
        <div className={boxClassStyle}><img src={imgSrc} alt='card-icon' className={className} /></div>
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  );
};