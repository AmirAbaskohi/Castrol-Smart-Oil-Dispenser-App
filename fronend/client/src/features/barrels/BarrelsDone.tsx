import styles from './Barrels.module.css';
import doneIcon from '../../icons/done.svg';
import { BarrelResponseType } from '../../types';
import { barrelQuantity, reset } from './barrelOilTypesSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useHistory } from "react-router-dom";


export const BarrelsDone = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const store = useAppSelector(barrelQuantity) as BarrelResponseType;
  const handleTheClick = () => {
    dispatch(reset());
    history.push("/home")
  }

  const renderBody = () =>
    <div>
      <div>
        <img src={doneIcon} alt="done" width="150" height="150" onClick={handleTheClick} style={{ marginLeft: '20%' }} />

      </div>
      <div className={styles.oilContent}>
        <p>Barrel Type: {store.selectedBarrelType} L</p>
        <p>Oil Type: {store.selectedOilType}</p>
      </div>
    </div>


  return (
    <div>{renderBody()}</div>
  );
}