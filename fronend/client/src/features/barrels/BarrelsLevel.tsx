import { useState } from 'react';
import { SelectOptionCard } from '../TemplatePage/SelectOptionCard';
import { TemplatePage } from '../TemplatePage/TemplatePage';
import barrelLevel1 from '../../icons/barrel-12.svg';
import barrelLevel2 from '../../icons/barrel-27.svg';
import reset from '../../icons/reset.svg';
import styles from './Barrels.module.css';
import { useAppDispatch } from '../../app/hooks';
import { barrelDetails, barrelReset } from '../barrels/barrelDetailsSlice';
import React, { useEffect } from "react";
import { RemainingQty } from '../dispense-oil/RemainingQty'

export const BarrelsLevel = () => {
  const dispatch = useAppDispatch();
  const [barrel, setBarrel] = useState([])

  useEffect(() => {
    dispatch(barrelDetails())
      .then(barrelDetailsData => {
        setBarrel(barrelDetailsData.payload)
      });
  }, [dispatch]);

  const roundVolPercentage = (remainingVol: any, totalVol: any) => Math.round((remainingVol / totalVol) * 100);

  const oilTypes = barrel.map((barrelData: any) => barrelData.oil_type);
  const totalVolume = barrel.map((barrelData: any) => barrelData.total_volume);
  const remainingVolume = barrel.map((barrelData: any) => barrelData.remaining_quantity);
  const oilId = barrel.map((barrelData: any) => barrelData.id);

  const remainingPercentage1 = roundVolPercentage(remainingVolume[0], totalVolume[0]);
  const remainingPercentage2 = roundVolPercentage(remainingVolume[1], totalVolume[1]);

  const resetBarrelLevel = ((id: any) => {
    dispatch(barrelReset(id))
      .then(barrelResetData => {
        RemainingQty(barrelResetData)
        window.location.reload();
      })
  });

  const renderBody = () =>
    <div>
      <nav>
        <div className={styles.content}>
          <div>
            <div className={styles.barrelRedIndicator}>
              <img src={reset} alt="reset" className={styles.resetIcon} onClick={(e) => resetBarrelLevel(oilId[0])} />
            </div>
            <div className={styles.container}>
              <SelectOptionCard className={styles.icon} imgSrc={barrelLevel1} handleClick={() => { }} title='' topCornersRounded={false} />
              <div className={styles.barrelPercentage}>{remainingPercentage1}%</div>
            </div>
            <div className={styles.barrelDetails}>
              <p>Barrel Type: {totalVolume[0]} L</p>
              <p>Oil: {oilTypes[0]} </p>
            </div>
          </div>
          <div>
            <div className={styles.barrelYellowIndicator}>
              <img src={reset} alt="reset" className={styles.resetIcon} onClick={(e) => resetBarrelLevel(oilId[1])} />
            </div>
            <div className={styles.container}>
              <SelectOptionCard className={styles.icon} imgSrc={barrelLevel2} handleClick={() => { }} title='' topCornersRounded={false} />
              <div className={styles.barrelPercentage}>{remainingPercentage2}%</div>
            </div>
            <div className={styles.barrelDetails2}>
              <p>Barrel Type: {totalVolume[1]} L</p>
              <p>Oil: {oilTypes[1]} </p>
            </div>
          </div>
        </div>
      </nav>
    </div>

  return (
    <TemplatePage
      showBackButton={true}
      backPath='/barrels'
      showNextButton={false}
      handleBack={() => { }}
      title='Barrel Levels'>
      {renderBody()}
    </TemplatePage>
  );
}