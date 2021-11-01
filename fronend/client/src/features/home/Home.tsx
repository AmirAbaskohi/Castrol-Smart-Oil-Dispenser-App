import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { reset } from '../dispense-oil/RegistrationNumberFlow/dispenseOilRegNumberFlowSlice';

import { SelectOptionCard } from '../TemplatePage/SelectOptionCard';
import { TemplatePage } from '../TemplatePage/TemplatePage';

import canisterIcon from '../../icons/canister.svg';
import barrelIcon from '../../icons/barrel.svg';
import statisticsIcon from '../../icons/statistics.svg';
import userIcon from '../../icons/user.svg';

import styles from './Home.module.css';

export const Home = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  dispatch(reset());

  const handleClick = (path: string) => history.push(path);

  const renderBody = () =>
    <div>
      <nav>
        <div className={styles.content}>
          <div>
            <SelectOptionCard className={styles.icon} imgSrc={canisterIcon} handleClick={() => handleClick('/dispense-oil')} title='Dispense Oil' />
          </div>
          <div>
            <SelectOptionCard className={styles.icon} imgSrc={barrelIcon} handleClick={() => handleClick('/barrels')} title='Barrels' />
          </div>
          <div>
            <SelectOptionCard className={styles.icon} imgSrc={statisticsIcon} handleClick={() => handleClick('/statistics')} title='Statistics' />
          </div>
          <div>
            <SelectOptionCard className={styles.icon} imgSrc={userIcon} handleClick={() => handleClick('/user-info')} title='Consumer Info' />
          </div>
        </div>
      </nav>
    </div>

  return (
    <TemplatePage showBackButton={false} showNextButton={false} handleBack={() => { }} title='Please select option'>
      {renderBody()}
    </TemplatePage>
  );
}