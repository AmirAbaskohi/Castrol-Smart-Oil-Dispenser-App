import { SelectOptionCard } from '../../TemplatePage/SelectOptionCard';

import pumpIcon from '../../../icons/pump.svg';

import styles from './SelectPump.module.css';

interface SelectPumpProps {
  handlePumpSelected: (id: number) => void;
}

export const SelectPump = ({ handlePumpSelected }: SelectPumpProps) => {
  return (<div className={styles.content}>
    <SelectOptionCard className={styles.icon} imgSrc={pumpIcon} handleClick={() => handlePumpSelected(1)} title='Left' />
    <SelectOptionCard className={styles.icon} imgSrc={pumpIcon} handleClick={() => handlePumpSelected(2)} title='Right' />
  </div>);
}