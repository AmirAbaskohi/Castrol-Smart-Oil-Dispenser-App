import { useHistory } from 'react-router-dom';

import { useAppDispatch } from '../../app/hooks';

import { SelectOptionCard } from '../TemplatePage/SelectOptionCard';
import { TemplatePage } from '../TemplatePage/TemplatePage';

import { reset as resetRegNumberFlow } from '../dispense-oil/RegistrationNumberFlow/dispenseOilRegNumberFlowSlice';
import { reset as resetQuantityFlow } from '../dispense-oil/QuantityFlow/dispenseOilQuantityFlowSlice';

import registrationNumberIcon from '../../icons/registration-number.svg';
import vehicleDetailsIcon from '../../icons/vehicle-details.svg';
import quantityIcon from '../../icons/quantity.svg';

import styles from './DispenseOil.module.css';

export const DispenseOil = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  dispatch(resetRegNumberFlow());
  dispatch(resetQuantityFlow());

  const handleTheClick = (path: string) => history.push(path);

  const renderBody = () =>
    <div>
      <nav>
        <div className={styles.content}>
          <div>
            <SelectOptionCard className={styles.icon} imgSrc={registrationNumberIcon} handleClick={() => handleTheClick('/dispense-oil/registration-number')} title='Registration Number' />
          </div>
          <div>
            <SelectOptionCard className={styles.icon} imgSrc={vehicleDetailsIcon} handleClick={() => handleTheClick('/dispense-oil/vehicle-details')} title='Vehicle Details' />
          </div>
          <div>
            <SelectOptionCard className={styles.icon} imgSrc={quantityIcon} handleClick={() => handleTheClick('/dispense-oil/quantity')} title='Quantity' />
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
      title='Please select option'>
      {renderBody()}
    </TemplatePage>
  );
}