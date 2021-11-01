import { useState } from 'react';

import { TemplatePage } from '../../TemplatePage/TemplatePage';
import { SelectPump } from './SelectPump';
import { SelectProcedure } from './SelectProcedure';
import { Procedure } from './Procedure';
import { ActionType, ProcedureType } from './enums';

import { controlPump } from './pumpAPI';

import styles from './PumpProceduresPage.module.css';

enum Step {
  SelectPump,
  SelectProcedure,
  PrimeProcedure,
  CalibrationProcedure,
};

export const PumpProceduresPage = () => {
  const [currentStep, setCurrentStep] = useState({ step: Step.SelectPump, title: 'Please select the pump' });
  const [showBackButton, setShowBackButton] = useState(false);
  const [selectedPump, setSelectedPump] = useState<number | null>(null);

  const handleBack = () => {
    switch (currentStep.step) {
      case Step.SelectProcedure:
        setCurrentStep({ step: Step.SelectPump, title: 'Please select the pump' });
        setShowBackButton(false);
        return;
      case Step.PrimeProcedure:
        setCurrentStep({ step: Step.SelectProcedure, title: 'Please select the procedure' });
        setShowBackButton(true);
        return;
      case Step.CalibrationProcedure:
        setCurrentStep({ step: Step.SelectProcedure, title: 'Please select the procedure' });
        setShowBackButton(true);
        return;
      default:
        setCurrentStep({ step: Step.SelectPump, title: 'Please select the pump' });
        setShowBackButton(false);
        return;
    }
  }

  const handlePumpSelected = (id: number) => {
    setSelectedPump(id);
    setCurrentStep({ step: Step.SelectProcedure, title: 'Please select the procedure' });
    setShowBackButton(true);
  }

  const handleProcedureSelected = (procedure: ProcedureType) => {
    if (procedure === ProcedureType.Prime) {
      setCurrentStep({ step: Step.PrimeProcedure, title: 'Prime procedure' });
    } else if (procedure === ProcedureType.Calibrate) {
      setCurrentStep({ step: Step.CalibrationProcedure, title: 'Calibration procedure' });
    }

    setShowBackButton(true);
  }

  const handleStartPriming = () => selectedPump && controlPump(selectedPump, ProcedureType.Prime, ActionType.Start);
  const handleStopPriming = () => selectedPump && controlPump(selectedPump, ProcedureType.Prime, ActionType.Stop);
  const handleStartCalibration = () => selectedPump && controlPump(selectedPump, ProcedureType.Calibrate, ActionType.Start);
  const handleStopCalibration = () => selectedPump && controlPump(selectedPump, ProcedureType.Calibrate, ActionType.Stop);

  const renderContent = () => {
    if (currentStep.step === Step.SelectPump) {
      return <SelectPump handlePumpSelected={id => handlePumpSelected(id)} />;
    } else if (currentStep.step === Step.SelectProcedure) {
      return <SelectProcedure handleProcedureSelected={procedure => handleProcedureSelected(procedure)} />;
    } else if (currentStep.step === Step.PrimeProcedure) {
      const message = 'Press the Start button to start priming the pump. When the priming is done, press the Stop button.';
      return <Procedure message={message} onStartClick={handleStartPriming} onStopClick={handleStopPriming} />
    } else if (currentStep.step === Step.CalibrationProcedure) {
      const message = 'Press the Start button to start calibrating the pump. After 200ml have been dispensed, press the Stop button to finish the calibration procedure.';
      return <Procedure message={message} onStartClick={handleStartCalibration} onStopClick={handleStopCalibration} />
    } else {
      return <div>Error</div>
    }
  }

  return (
    <TemplatePage showBackButton={showBackButton} showNextButton={false} backPath='/admin/pump-procedures' handleBack={handleBack} title={currentStep.title} >
      <div className={styles.content}>
        {renderContent()}
      </div>
    </TemplatePage >
  );
}