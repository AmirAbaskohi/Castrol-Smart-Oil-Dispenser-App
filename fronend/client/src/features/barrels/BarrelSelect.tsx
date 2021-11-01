import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { SelectOptionCard } from '../TemplatePage/SelectOptionCard';
import { barrelTypes } from '../barrels/barrelTypesSlice';
import React, { useEffect } from "react";
import styles from './Barrels.module.css';
import { OilType } from '../../types';

interface BarrelSelectTypeProp {
  types: OilType[];
  handleClick: (type: any, id: any) => void;
}

export const BarrelSelect = (props: BarrelSelectTypeProp) => {
  const dispatch = useAppDispatch();
  const [barrelInfo, setBarrelTypes] = useState([]);

  useEffect(() => {
    dispatch(barrelTypes())
      .then(barrelTypesData => {
        setBarrelTypes(barrelTypesData.payload)
      });
  }, [dispatch]);

  const renderBody = () =>
    <div>
      <nav>
        <div className={styles.content}>{
          barrelInfo.map((data: any) =>
            <div key={data.id}>
              <SelectOptionCard className={""} imgSrc={`/barrel-${data.total_volume}.svg`}
                handleClick={() => props.handleClick(data.total_volume, data.id)} title={`${data.total_volume}L`} />
            </div>
          )}
        </div>
      </nav>
    </div>

  return (
    <div className={styles.list}>
      {renderBody()}
    </div>
  );
}