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

      <br/><br/><label>Age</label><br />
      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <br/><br/><label>Years Licensed</label><br />
      <input
        placeholder="Years Licensed"
        value={licenseYears}
        onChange={(e) => setLicenseYears(e.target.value)}
      />

      <div style={{ marginTop: "20px" }}>
        <button onClick={prevStep}>Back</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}