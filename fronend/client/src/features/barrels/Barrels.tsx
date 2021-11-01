import { useHistory } from 'react-router-dom';
import { SelectOptionCard } from '../TemplatePage/SelectOptionCard';
import { TemplatePage } from '../TemplatePage/TemplatePage';
import barrelInfo from '../../icons/barrel-info.svg';
import barrelReorder from '../../icons/barrel-reorder.svg';
import styles from '../dispense-oil/DispenseOil.module.css';

export const Barrels = () => {
  const history = useHistory();
  const handleTheClick = (path: string) => history.push(path);

  const renderBody = () =>
    <div>
      <nav>
        <div className={styles.content}>
          <div>
            <SelectOptionCard className={styles.icon} imgSrc={barrelInfo} handleClick={() => handleTheClick('/barrels/info')} title='Info' />
          </div>
          <div>
            <SelectOptionCard className={styles.icon} imgSrc={barrelReorder} handleClick={() => handleTheClick('/barrels/reorder')} title='Reorder' />
          </div>
        </div>
      </nav>
    </div>

  return (
    <TemplatePage
      showBackButton={true}
      backPath='/home'
      showNextButton={false}
      handleBack={() => { }}
      title='Barrels'>
      {renderBody()}
    </TemplatePage>
  );
}