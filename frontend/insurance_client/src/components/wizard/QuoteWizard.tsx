import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StepProgressBar from "./StepProgressBar";

import PersonalInfoStep from "./steps/PersonalInfoStep";
import VehicleStep from "./steps/VehicleStep";
import DriverStep from "./steps/DriverStep";
import FinalDetailsStep from "./steps/FinalDetailsStep";
import RateResultStep from "./steps/RateResultStep";

import type { WizardFormData } from "../../types/wizard";

export default function QuoteWizard() {
  const stepKeys = ["personal", "vehicles", "drivers", "final", "rates"] as const;
  type StepKey = (typeof stepKeys)[number]; // "personal" | "vehicles" | ...

  const { step: stepParam } = useParams<{ step: string }>();
  const navigate = useNavigate();

  // Initialize step from URL, default to 0
  const initialStep = stepParam ? stepKeys.indexOf(stepParam.toLowerCase() as StepKey) : 0;

  const [step, setStep] = useState(initialStep >= 0 ? initialStep : 0);

  const [formData, setFormData] = useState<WizardFormData>({
    personal: {
      fullName: "John Doe",
      dob: "1999-06-15",
      email: "john.doe@email.com",
    },
    vehicle: {
      make: "Toyota",
      model: "Camry",
      year: "2020",
    },
    driver: {
      age: "26",
      licenseYears: "12",
    },
    final: {
      agreeTerms: false,
      coverageType: "Personal Auto",    
    },
  });

  // Memoized setter to avoid unnecessary re-renders
  const updateData = useCallback(<K extends keyof WizardFormData>(
    section: K,
    data: WizardFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  }, []);

  const goToStep = (index: number) => {
    setStep(index);
    navigate(`/quote/${stepKeys[index]}`);
  };

  const nextStep = () => goToStep(Math.min(step + 1, stepKeys.length - 1));
  const prevStep = () => goToStep(Math.max(step - 1, 0));

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
            formData={formData}
            nextStep={nextStep}
            prevStep={prevStep}
            updateData={(d) => updateData("final", d)}
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
      <StepProgressBar steps={[...stepKeys]} currentStep={step} />

      <div style={{ padding: "20px 40px" }}>
        {renderStep()}
      </div>
    </div>
  );
}