import { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { DispenseRegNumberFlowStep as Step } from '../../../enums';
import loadingIcon from '../../../icons/loading.svg';
import { DispenseCarRegNumberResponseType, UserAuth } from '../../../types';
import { DispenseOilConfirmationPage } from '../../TemplatePage/DispenseOilConfirmationPage';
import { DonePage } from '../../TemplatePage/DonePage';
import { SelectOilQuantity } from '../../TemplatePage/SelectOilQuantity';
import { SelectOilType } from '../../TemplatePage/SelectOilType';
import { TemplatePage } from '../../TemplatePage/TemplatePage';
import {
  clearError, getCarDetails, goBack, oilTypeSelected,
  quantityConfirmed, regNumberFlowState, startDispensing
} from './dispenseOilRegNumberFlowSlice';
import { RegistrationNumber } from './RegistrationNumber';
import { RemainingQty } from '../RemainingQty'

import { userAuthState } from '../../user/userSlice';

import styles from './DispenseOilRegistrationNumber.module.css';

export const DispenseOilRegistrationNumber = () => {
  const [remainingQty, setRemainingQty] = useState('');
  const dispatch = useAppDispatch();
  const store = useAppSelector(regNumberFlowState) as DispenseCarRegNumberResponseType;
  const userStore = useAppSelector(userAuthState) as UserAuth;

  const [registrationNumber, setRegistrationNumber] = useState('');

  const titles = {
    [Step.InsertRegistrationNumber]: 'Enter Registration Number',
    [Step.SelectOilType]: 'Select Oil Type',
    [Step.SelectQuantity]: 'Select Quantity',
    [Step.DispenseOil]: 'Dispense Oil',
    [Step.Done]: 'Done',
  };

  const showBackButton = () => store.currentStep === Step.Done ? false : true;
  const getBackPath = () => store.currentStep === Step.InsertRegistrationNumber ? '/dispense-oil' : '/dispense-oil/registration-number';

  const handleBack = () => dispatch(goBack());

  const getShowNextButton = () => store.currentStep === Step.InsertRegistrationNumber;

  const handleRegNumberValueChanged = useCallback((value: string) => {
    setRegistrationNumber(value);
    dispatch(clearError());
  }, [dispatch]);

  const handleNext = () =>
    store.currentStep === Step.InsertRegistrationNumber && dispatch(getCarDetails(registrationNumber));

  const handleOilTypeSelected = (id: string) => dispatch(oilTypeSelected(id));

  const handleQuantitySelected = (adjustedQuantity: string) => dispatch(quantityConfirmed(adjustedQuantity));

  const handleStartDispensing = () => dispatch(startDispensing({
    registrationNumber: registrationNumber,
    suggestedQuantity: store.recommendedQuantity,
    dispensedQuantity: store.selectedQuantity,
    oilType: store.selectedOilType,
    dispenseType: 'registration-number-flow',
    userId: userStore.id,
  })).then(remainingOilData => {
    let oilQty = RemainingQty(remainingOilData);
    setRemainingQty(oilQty);
  })

  const isLoading = store.status === 'loading';

  const renderContent = () => {
    const selectedOilType = store.types.find(t => t?.name === store.selectedOilType);
    const errorClass = store.error ? styles.error : styles.error + ' ' + styles.hide;
    const errorMessage = 'Please insert a valid registration number.';

    switch (store.currentStep) {
      case Step.InsertRegistrationNumber:
        return (
          <div>
            <div className={errorClass}>{errorMessage}</div>
            <RegistrationNumber defaultValue={registrationNumber} onValueChange={handleRegNumberValueChanged} />
          </div >);
      case Step.SelectOilType:
        return (
          <div>
            <div className={styles.carDetails}>{store.details}</div>
            <SelectOilType quantity={store.recommendedQuantity} types={store.types} handleClick={oilTypeId => handleOilTypeSelected(oilTypeId)} />
          </div>);
      case Step.SelectQuantity:
        return (selectedOilType &&
          <SelectOilQuantity
            type={selectedOilType.name}
            recommendedQuantity={store.selectedQuantity || store.recommendedQuantity}
            handleDone={adjustedQuantity => handleQuantitySelected(adjustedQuantity)}
          />);
      case Step.DispenseOil:
        return (selectedOilType &&
          <DispenseOilConfirmationPage
            type={selectedOilType.name}
            quantity={store.selectedQuantity}
            onStartClick={handleStartDispensing}
          />)
      case Step.Done:
        return (selectedOilType &&
          <DonePage
            type={selectedOilType.name}
            dispensedQuantity={store.selectedQuantity}
            remainingQuantityInBarrel={remainingQty}
          />)
      default:
        return <div>Error</div>
    }
  }

  let contentClassStyle = isLoading ? styles.regNumberContent + ' ' + styles.opacity : styles.regNumberContent;

  return (
    <div className={styles.pageContainer}>
      <div className={contentClassStyle}>
        <TemplatePage
          showBackButton={showBackButton()}
          backPath={getBackPath()}
          handleBack={handleBack}
          showNextButton={getShowNextButton()}
          handleNext={handleNext}
          title={titles[store.currentStep]}>
          <div className={styles.list}>
            {renderContent()}
          </div>
        </TemplatePage >
      </div>
      {isLoading && <img src={loadingIcon} alt='loading-icon' className={styles.loading} />}
    </div>
  );
}