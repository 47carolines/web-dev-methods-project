import { useState } from "react";
import type { DriverData } from "../../../types/driver";

interface Props {
  data: DriverData;
  updateData: (data: DriverData) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function DriverStep({
  data,
  updateData,
  nextStep,
  prevStep,
}: Props) {
  const [age, setAge] = useState(data.age);
  const [licenseYears, setLicenseYears] = useState(data.licenseYears);

  const handleNext = () => {
    updateData({ age, licenseYears });
    nextStep();
  };

  return (
    <div style={{ maxWidth: "500px" }}>
      <h2>Driver Information</h2>

      <label style={{ display: "block", marginBottom: "12px" }}>
        Age
        <input
          name="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </label>

      <label style={{ display: "block", marginBottom: "12px" }}>
        Years Licensed
        <input
          name="licenseYears"
          value={licenseYears}
          onChange={(e) => setLicenseYears(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </label>

      <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
        <button onClick={prevStep}>Back</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}