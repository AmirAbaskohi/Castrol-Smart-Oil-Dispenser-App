import { SelectOptionCard } from './SelectOptionCard';
import { OilType } from '../../types';


import canisterIcon from '../../icons/canister.svg';

import styles from './SelectOilType.module.css';

interface SelectOilTypeProp {
  quantity: string;
  types: OilType[];
  handleClick: (oilTypeId: string) => void;
}

export const SelectOilType = (props: SelectOilTypeProp) =>
  <div>
    {props.quantity && <div className={styles.capacity}>Capacity: {props.quantity} L</div>}
    <div className={styles.content}>
      {props.types.map(type => (
        <SelectOptionCard
          className={styles.icon}
          key={type?.id}
          id={type?.id}
          imgSrc={canisterIcon}
          handleClick={oilTypeId => props.handleClick(oilTypeId)}
          title={type?.name || ''} />
      ))}
    </div>
  </div>



