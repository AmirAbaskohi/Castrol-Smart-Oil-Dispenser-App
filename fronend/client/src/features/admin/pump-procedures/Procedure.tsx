import { useState } from 'react';

import styles from './Procedure.module.css';

interface ProcedureProps {
  message: string;
  onStartClick: () => void;
  onStopClick: () => void;
}

export const Procedure = ({ message, onStartClick, onStopClick }: ProcedureProps) => {
  const [startEnabled, setStartState] = useState(true);
  const [stopEnabled, setStopState] = useState(false);
  const [duration, setDuration] = useState<Number | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(new Date())

  const handleStart = () => {
    setStartState(false);
    setStopState(true);
    setDuration(null);
    setStartTime(new Date());
    onStartClick();
  }

  const handleStop = () => {
    setStartState(true);
    setStopState(false);
    const stopTime = new Date();

    if (startTime) {
      setDuration((stopTime.getTime() - startTime.getTime()) / 1000);
    }

    onStopClick();
  }

  const getButtonStyle = (enabled: boolean) => enabled ? styles.button : styles.button + ' ' + styles.buttonDisabled;

  return (
    <div className={styles.content}>
      <div className={styles.message}>{message}</div>
      <div className={styles.buttonsSection}>
        {startEnabled && <button disabled={!startEnabled} className={getButtonStyle(startEnabled)} onClick={handleStart}>Start</button>}
        {stopEnabled && <button disabled={!stopEnabled} className={getButtonStyle(stopEnabled)} onClick={handleStop}>Stop</button>}
      </div>
      {duration && <div>Duration: {duration}s</div>}
    </div>
  )
}