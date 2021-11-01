import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  getOilTypes,
  quantityFlowState,
  oilTypeSelected,
  quantityConfirmed,
  startDispensing,
  goBack,
} from './dispenseOilQuantityFlowSlice';
import { TemplatePage } from '../../TemplatePage/TemplatePage';
import { SelectOilType } from '../../TemplatePage/SelectOilType';
import { SelectOilQuantity } from '../../TemplatePage/SelectOilQuantity';
import { DispenseOilConfirmationPage } from '../../TemplatePage/DispenseOilConfirmationPage';
import { DonePage } from '../../TemplatePage/DonePage';
import { userAuthState } from '../../user/userSlice';
import { DispenseQuantityResponseType, UserAuth } from '../../../types';
import { DispenseQuantityFlowStep as Step } from '../../../enums';

import loadingIcon from '../../../icons/loading.svg';
import styles from './DispenseOilQuantity.module.css';
import { RemainingQty } from '../RemainingQty'

export const DispenseOilQuantity = () => {
  const [remainingQty, setRemainingQty] = useState('');
  const dispatch = useAppDispatch();
  const store = useAppSelector(quantityFlowState) as DispenseQuantityResponseType;
  const userStore = useAppSelector(userAuthState) as UserAuth;

  useEffect(() => {
    dispatch(getOilTypes());
  }, [dispatch]);

  const titles = {
    [Step.SelectOilType]: 'Select Oil Type',
    [Step.SelectQuantity]: 'Select Quantity',
    [Step.DispenseOil]: 'Dispense Oil',
    [Step.Done]: 'Done',
  };

  const showBackButton = () => store.currentStep === Step.Done ? false : true;
  const getBackPath = () => store.currentStep === Step.SelectOilType ? '/dispense-oil' : '/dispense-oil/quantity';

  const handleBack = () => dispatch(goBack());

  const handleOilTypeSelected = (id: string) => dispatch(oilTypeSelected(id));

  const handleQuantitySelected = (adjustedQuantity: string) => dispatch(quantityConfirmed(adjustedQuantity));

  const handleStartDispensing = () => dispatch(startDispensing({
    dispensedQuantity: store.selectedQuantity,
    oilType: store.selectedOilType,
    dispenseType: 'quantity-flow',
    userId: userStore.id,
  })).then(remainingOilData => {
    let oilQty = RemainingQty(remainingOilData);
    setRemainingQty(oilQty);
  })

  const isLoading = store.status === 'loading';

  const renderContent = () => {
    const selectedOilType = store.types.find(t => t?.name === store.selectedOilType);

    if (store.error) return <div className={styles.error}>An error occurred.</div>;

    switch (store.currentStep) {
      case Step.SelectOilType:
        return (
          <div>
            <SelectOilType quantity='' types={store.types} handleClick={oilTypeId => handleOilTypeSelected(oilTypeId)} />
          </div>);
      case Step.SelectQuantity:
        return (selectedOilType &&
          <SelectOilQuantity
            type={selectedOilType.name}
            recommendedQuantity={store.selectedQuantity || ''}
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
          showNextButton={false}
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