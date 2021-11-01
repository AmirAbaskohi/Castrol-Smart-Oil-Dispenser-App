import { useHistory } from 'react-router-dom';

import { SelectOptionCard } from '../../TemplatePage/SelectOptionCard';
import { TemplatePage } from '../../TemplatePage/TemplatePage';

import statsGraph from '../../../icons/stats-graph.svg';
import statsTransaction from '../../../icons/stats-transaction.svg';

import styles from './StatisticsOrders.module.css';

export const StatisticsOrders = () => {
  const history = useHistory();
  const handleClick = (path: string) => history.push(path);

  const renderBody = () =>
    <div>
      <nav>
        <div className={styles.content}>
          <div>
            <SelectOptionCard className={styles.icon} imgSrc={statsGraph} handleClick={() => handleClick('/statistics/orders/graph')} title='Graph' />
          </div>
          <div>
            <SelectOptionCard className={styles.icon} imgSrc={statsTransaction} handleClick={() => handleClick('/statistics/orders/transactions')} title='Transactions' />
          </div>
        </div>
      </nav>
    </div>

  return (
    <TemplatePage showBackButton={true} backPath='/statistics' showNextButton={false} handleBack={() => { }} title='Orders'>
      {renderBody()}
    </TemplatePage>
  );
}