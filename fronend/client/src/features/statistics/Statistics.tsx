import { useHistory } from 'react-router-dom';
import { SelectOptionCard } from '../TemplatePage/SelectOptionCard';
import { TemplatePage } from '../TemplatePage/TemplatePage';
import statsDispense from '../../icons/stats-dispense.svg';
import statsOrders from '../../icons/stats-orders.svg';
import statsEnvironments from '../../icons/stats-environments.svg';
import styles from '../dispense-oil/DispenseOil.module.css';

export const Statistics = () => {
  const history = useHistory();
  const handleTheClick = (path: string) => history.push(path);

  const renderBody = () =>
    <div>
      <nav>
        <div className={styles.content}>
          <div>
            <SelectOptionCard className={styles.icon} imgSrc={statsDispense} handleClick={() => handleTheClick('/statistics/dispenses')} title='Dispense' />
          </div>
          <div>
            <SelectOptionCard className={styles.icon} imgSrc={statsOrders} handleClick={() => handleTheClick('/statistics/orders')} title='Orders' />
          </div>
          <div>
            <SelectOptionCard className={styles.icon} imgSrc={statsEnvironments} handleClick={() => handleTheClick('/statistics/environmental')} title='Environmental Benefits' />

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
      title='Statistics'>
      {renderBody()}
    </TemplatePage>
  );
}