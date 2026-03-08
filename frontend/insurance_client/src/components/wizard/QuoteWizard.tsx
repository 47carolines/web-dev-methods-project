import { useState, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StepProgressBar from "./StepProgressBar";

import PersonalInfoStep from "./steps/PersonalInfoStep";
import VehicleStep from "./steps/VehicleStep";
import DriverStep from "./steps/DriverStep";
import FinalDetailsStep from "./steps/FinalDetailsStep";
import RateResultStep from "./steps/RateResultStep";

import type { WizardFormData } from "../../types/wizard";

const STEP_KEYS = ["personal", "vehicles", "drivers", "final", "rates"];
const STEP_LABELS = ["Personal", "Vehicles", "Drivers", "Final", "Rates"];

export default function QuoteWizard() {
  const navigate = useNavigate();
  const { step: stepParam } = useParams<{ step: string }>();

  const step = useMemo(() => {
    if (!stepParam) return 0;
    const idx = STEP_KEYS.indexOf(stepParam.toLowerCase());
    return idx >= 0 ? idx : 0;
  }, [stepParam]);

  const [formData, setFormData] = useState<WizardFormData>({
    personal: { fullName: "", dob: "", email: "" },
    vehicle: { make: "", model: "", year: "" },
    driver: { age: "", licenseYears: "" },
    final: {},
  });

  const goToStep = useCallback(
    (index: number) => {
      navigate(`/quote/${STEP_KEYS[index]}`);
    },
    [navigate]
  );

  const nextStep = () => goToStep(Math.min(step + 1, STEP_KEYS.length - 1));
  const prevStep = () => goToStep(Math.max(step - 1, 0));

  const updateData = useCallback(
    <K extends keyof WizardFormData>(section: K, data: WizardFormData[K]) => {
      setFormData((prev) => ({
        ...prev,
        [section]: data,
      }));
    },
    []
  );

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
        steps={STEP_LABELS}
        currentStep={step}
      />

      <div style={{ padding: "20px 40px" }}>
        {renderStep()}
      </div>
    </div>
  );
}