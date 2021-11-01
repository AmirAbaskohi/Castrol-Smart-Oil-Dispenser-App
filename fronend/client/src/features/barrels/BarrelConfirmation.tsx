import { BarrelResponseType, UserAuth } from '../../types';
import { barrelQuantity, barrelOrder } from './barrelOilTypesSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { userAuthState } from '../user/userSlice';

import styles from './Barrels.module.css';

export const BarrelConfirmation = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector(barrelQuantity) as BarrelResponseType;
  const userStore = useAppSelector(userAuthState) as UserAuth;

  const handleSubmitClick = () => dispatch(barrelOrder({
    selectedBarrelId: store.selectedBarrelId,
    selectedOilType: store.selectedOilType,
    userId: userStore.id
  }));

  return (
    <div>
      <nav>
        <div className={styles.content}>
          <div className={styles.oilContent}>
            <p></p>
            <p>Barrel Type: {store.selectedBarrelType} L</p>
            <p>Oil Type: {store.selectedOilType}</p>
          </div>
          <div style={{ width: '100%' }}>
            <button className={styles.startButtonStyle} onClick={handleSubmitClick}>Order</button>
          </div>
        </div>
      </nav>
    </div>
  );
}