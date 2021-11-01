import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import { TemplatePage } from '../../TemplatePage/TemplatePage';
import { List } from '../../TemplatePage/List';
import { SelectOilType } from '../../TemplatePage/SelectOilType';
import { SelectOilQuantity } from '../../TemplatePage/SelectOilQuantity';
import { DispenseOilConfirmationPage } from '../../TemplatePage/DispenseOilConfirmationPage';
import { DonePage } from '../../TemplatePage/DonePage';
import { DispenseVehicleDetailsFlowStep as Step } from '../../../enums';

import { startDispensing } from './dispenseOilVehicleDetailsFlowSlice';
import { userAuthState } from '../../user/userSlice';
import { RemainingQty } from '../RemainingQty'

import {
  categories,
  carManufacturers,
  models,
  types,
  oilTypes,
  getRecommendedQuantity,
} from '../data';

import { UserAuth } from '../../../types';

import styles from './DispenseOilVehicleDetails.module.css';

export const DispenseOilVehicleDetails = () => {
  const dispatch = useAppDispatch();

  const [currentStep, setCurrentStep] = useState({ step: Step.Category, title: 'Select category' });
  const [categoryId, setCategoryId] = useState('');
  const [carManufacturer, setCarManufacturer] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carEngineType, setCarEngineType] = useState('');
  const [oilType, setOilType] = useState('');
  const [adjustedQuantity, setAdjustedQuantity] = useState('');
  const [showBackButton, setShowBackButton] = useState(true);
  const [remainingQty, setRemainingQty] = useState('');

  const userStore = useAppSelector(userAuthState) as UserAuth;

  const getNextStep = (value: string) => {
    switch (currentStep.step) {
      case Step.Category:
        setCategoryId(value);
        return { step: Step.Manufacturer, title: 'Select manufacturer' };
      case Step.Manufacturer:
        setCarManufacturer(value);
        return { step: Step.Model, title: 'Select Model' };
      case Step.Model:
        setCarModel(value);
        return { step: Step.Type, title: 'Select Type' };
      case Step.Type:
        setCarEngineType(value);
        return { step: Step.SelectOilType, title: 'Select Oil Type' };
      case Step.SelectOilType:
        setOilType(value);
        return { step: Step.SelectQuantity, title: 'Select Quantity' };
      case Step.SelectQuantity:
        setAdjustedQuantity(value);
        return { step: Step.DispenseOil, title: 'Dispense Oil' };
      case Step.DispenseOil:
        setShowBackButton(false);
        return { step: Step.Done, title: 'Done' };
      case Step.Done:
      default: return { step: Step.Category, title: 'Select category' };
    }
  }

  const handleClick = (value: string) => setCurrentStep(getNextStep(value));
  const handleQuantityDone = (adjustedQuantity: string) => setCurrentStep(getNextStep(adjustedQuantity));

  const handleStartClick = () => {
    setShowBackButton(false);

    dispatch(startDispensing({
      carManufacturer,
      carModel,
      carEngineType,
      suggestedQuantity: getRecommendedQuantity(),
      dispensedQuantity: adjustedQuantity,
      oilType: oilType,
      dispenseType: 'vehicle-details-flow',
      userId: userStore.id,
    })).then(remainingOilData => {
      let oilQty = RemainingQty(remainingOilData);
      setRemainingQty(oilQty);
    })
    setTimeout(() => setCurrentStep(getNextStep(adjustedQuantity)), 3000);
  }

  const handleBack = () => setCategoryId('');
  const getBackPath = () => !categoryId ? '/dispense-oil' : '/dispense-oil/vehicle-details';

  const getManufacturers = (categoryId: string) =>
    carManufacturers;

  const renderContent = () => {
    switch (currentStep.step) {
      case Step.Category:
        return (<List items={categories} handleSelection={handleClick} />);
      case Step.Manufacturer:
        return (<List items={getManufacturers(categoryId)} handleSelection={handleClick} />);
      case Step.Model:
        return (<List items={models} handleSelection={handleClick} />);
      case Step.Type:
        return (<List items={types} handleSelection={handleClick} />);
      case Step.SelectOilType:
        return (<SelectOilType quantity={oilTypes.quantity} types={oilTypes.types} handleClick={oilType => handleClick(oilType)} />)
      case Step.SelectQuantity:
        return (<SelectOilQuantity type={oilType} recommendedQuantity={getRecommendedQuantity()} handleDone={adjustedQuantity => handleQuantityDone(adjustedQuantity)} />)
      case Step.DispenseOil:
        return (<DispenseOilConfirmationPage type={oilType} quantity={adjustedQuantity} onStartClick={handleStartClick} />)
      case Step.Done:
        return (<DonePage type={oilType} dispensedQuantity={adjustedQuantity} remainingQuantityInBarrel={remainingQty} />)
      default:
        return <div>Error</div>
    }
  }

  return (
    <TemplatePage showBackButton={showBackButton} showNextButton={false} backPath={getBackPath()} handleBack={handleBack} title={currentStep.title}>
      <div className={styles.list}>
        {renderContent()}
      </div>
    </TemplatePage >
  );
}