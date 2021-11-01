import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { SelectOptionCard } from '../TemplatePage/SelectOptionCard';
import canister from '../../icons/canister.svg';
import styles from './Barrels.module.css';
import { getOilTypes } from '../barrels/barrelOilTypesSlice';
import React, { useEffect } from "react";

interface BarrelSelectOilTypeProp {
  oilType: string;
  handleClick: (oilType: any) => void;
}

export const BarrelsSelectOilType = (props: BarrelSelectOilTypeProp) => {
  const dispatch = useAppDispatch();
  const [oilTypes, setOilTypes] = useState([]);

  useEffect(() => {
    dispatch(getOilTypes())
      .then(barrelOilTypesData => {
        setOilTypes(barrelOilTypesData.payload)
      })
  }, [dispatch]);

  const totalVolume = oilTypes.map((barrelOilTypesData: any) => barrelOilTypesData.oil_type);

  return (
    <div className={styles.list}>
      <nav>
        <div className={styles.content}>{
          totalVolume.map((title) =>
            <div key={title}>
              <SelectOptionCard className={""} imgSrc={canister}
                handleClick={() => props.handleClick(title)} title={`${title}L`} />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}