import { SelectOptionCard } from '../../TemplatePage/SelectOptionCard';
import { ProcedureType } from './enums'

import primeIcon from '../../../icons/prime.svg';
import calibrateIcon from '../../../icons/calibrate.svg';

import styles from './SelectProcedure.module.css';

interface SelectProcedureProps {
  handleProcedureSelected: (pump: ProcedureType) => void;
}

export const SelectProcedure = ({ handleProcedureSelected }: SelectProcedureProps) => {
  return (<div className={styles.content}>
    <SelectOptionCard className={styles.icon} imgSrc={primeIcon} handleClick={() => handleProcedureSelected(ProcedureType.Prime)} title='Prime' />
    <SelectOptionCard className={styles.icon} imgSrc={calibrateIcon} handleClick={() => handleProcedureSelected(ProcedureType.Calibrate)} title='Calibrate' />
  </div>);
}