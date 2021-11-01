import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TemplatePage } from '../TemplatePage/TemplatePage';
import styles from './Barrels.module.css';
import { barrelQuantity } from './barrelOilTypesSlice';
import { BarrelResponseType } from '../../types';
import { BarrelQuantityFlowStep as Step } from '../../enums';
import { BarrelSelect } from './BarrelSelect';
import { barrelTypeSelected, oilTypeSelected, goBack } from './barrelOilTypesSlice';
import { BarrelsSelectOilType } from './BarrelsSelectOilType';
import { BarrelConfirmation } from './BarrelConfirmation';
import { BarrelsDone } from './BarrelsDone';
import loadingIcon from '../../icons/loading.svg';

export const BarrelsReorderSelect = () => {
  const store = useAppSelector(barrelQuantity) as BarrelResponseType;
  const showBackButton = () => store.currentStep === Step.Done ? false : true;
  const getBackPath = () => store.currentStep === Step.SelectBarrelType ? '/barrels' : '/barrels/reorder';
  const handleBack = () => dispatch(goBack());
  const dispatch = useAppDispatch();


  const titles = {
    [Step.SelectBarrelType]: 'Select Barrel Type',
    [Step.SelectOilType]: 'Select Oil Type',
    [Step.Order]: 'Confirmation',
    [Step.Done]: 'Done',
  };

  const handleBarrelTypeSelected = (type: any, id: string) => dispatch(barrelTypeSelected({ type, id }));
  const handleOilTypeSelected = (oilType: string) => dispatch(oilTypeSelected(oilType));
  const isLoading = store.status === 'loading';
  const renderBody = () => {
    const selectedBarrelTypeId = store.selectedBarrelType;
    switch (store.currentStep) {
      case Step.SelectBarrelType:
        return (
          <div>
            <BarrelSelect types={store.types} handleClick={(oilTypeId, type) => handleBarrelTypeSelected(oilTypeId, type)}></BarrelSelect>
          </div>)
      case Step.SelectOilType:
        return (selectedBarrelTypeId &&
          <div>
            <BarrelsSelectOilType oilType={store.selectedOilType} handleClick={(oilType: any) => handleOilTypeSelected(oilType)}></BarrelsSelectOilType>
          </div>)
      case Step.Order:
        return (selectedBarrelTypeId &&
          <div>
            <BarrelConfirmation></BarrelConfirmation>
          </div>)
      case Step.Done:
        return (
          <div>
            <BarrelsDone></BarrelsDone>
          </div>)
      default:
        return <div>Error</div>
    }
  }
  let contentClassStyle = isLoading ? styles.barrelContent + ' ' + styles.opacity : styles.barrelContent;
  return (
    <div className={styles.pageContainer}>
      <div className={contentClassStyle}>
        <TemplatePage showBackButton={showBackButton()} backPath={getBackPath()} handleBack={handleBack} showNextButton={false} title={titles[store.currentStep]}>
          <div className={styles.list}>
            {renderBody()}
          </div>
        </TemplatePage>
      </div>
      {isLoading && <img src={loadingIcon} alt='loading-icon' className={styles.loading} />}
    </div>
  );
}