import { useState } from "react";
import type { VehicleData } from "../../../types/vehicle";

interface Props {
  data: VehicleData;
  updateData: (data: VehicleData) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function VehicleStep({
  data,
  updateData,
  nextStep,
  prevStep,
}: Props) {
  const [make, setMake] = useState(data.make);
  const [model, setModel] = useState(data.model);
  const [year, setYear] = useState(data.year);

  const handleNext = () => {
    updateData({ make, model, year });
    nextStep();
  };

  return (
    <div style={{ maxWidth: "500px" }}>
      <h2>Vehicle Information</h2>

      <label style={{ display: "block", marginBottom: "12px" }}>
        Make
        <input
          name="make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </label>

      <label style={{ display: "block", marginBottom: "12px" }}>
        Model
        <input
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </label>

      <label style={{ display: "block", marginBottom: "12px" }}>
        Year
        <input
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
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