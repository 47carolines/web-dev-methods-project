import { useState } from "react";
import StepProgressBar from "./StepProgressBar";

import StartStep from "./steps/StartStep";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import VehicleStep from "./steps/VehicleStep";
import DriverStep from "./steps/DriverStep";
import FinalDetailsStep from "./steps/FinalDetailsStep";
import RateResultStep from "./steps/RateResultStep";

export default function QuoteWizard() {
  const steps = [
    "Start",
    "Personal",
    "Vehicles",
    "Drivers",
    "Final",
    "Rates",
  ];

  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    personal: {},
    vehicle: {},
    driver: {},
    final: {},
  });

  function updateData(section: string, data: any) {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  }

  function nextStep() {
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function renderStep() {
    switch (step) {
      case 0:
        return <StartStep nextStep={nextStep} />;
      case 1:
        return (
          <PersonalInfoStep
            data={formData.personal}
            updateData={(d) => updateData("personal", d)}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 2:
        return (
          <VehicleStep
            data={formData.vehicle}
            updateData={(d) => updateData("vehicle", d)}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <DriverStep
            data={formData.driver}
            updateData={(d) => updateData("driver", d)}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <FinalDetailsStep
            data={formData.final}
            updateData={(d) => updateData("final", d)}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:
        return <RateResultStep formData={formData} />;
      default:
        return null;
    }
  }

  return (
    <div>
      <StepProgressBar
        steps={steps}
        currentStep={step}
      />

      <div style={{ padding: "20px 40px" }}>
        {renderStep()}
      </div>
    </div>
  );
}