import { useState } from "react";
import StepProgressBar from "./StepProgressBar";

import PersonalInfoStep from "./steps/PersonalInfoStep";
import VehicleStep from "./steps/VehicleStep";
import DriverStep from "./steps/DriverStep";
import FinalDetailsStep from "./steps/FinalDetailsStep";
import RateResultStep from "./steps/RateResultStep";

export default function QuoteWizard() {
  const steps = [
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
      return (
        <PersonalInfoStep
          data={formData.personal}
          updateData={(d) => updateData("personal", d)}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );

    case 1:
      return (
        <VehicleStep
          data={formData.vehicle}
          updateData={(d) => updateData("vehicle", d)}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );

    case 2:
      return (
        <DriverStep
          data={formData.driver}
          updateData={(d) => updateData("driver", d)}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );

    case 3:
      return (
        <FinalDetailsStep
          data={formData.final}
          updateData={(d) => updateData("final", d)}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );

    case 4:
      return (
        <RateResultStep
          formData={formData}
          prevStep={prevStep}
        />
      );

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