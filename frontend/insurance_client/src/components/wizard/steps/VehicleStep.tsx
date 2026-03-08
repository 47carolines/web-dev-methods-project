import { useState, useEffect } from "react";
import type { VehicleData } from "../../../types/vehicle";
interface Props {
  data: VehicleData;
  updateData: (data: VehicleData) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function VehicleStep({ data, updateData, nextStep, prevStep }: Props) {
  const [make, setMake] = useState(data.make || "");
  const [model, setModel] = useState(data.model || "");
  const [year, setYear] = useState(data.year || "");

  useEffect(() => {
    updateData({ make, model, year });
  }, [make, model, year]);

  return (
    <div style={{ maxWidth: "500px" }}>
      <h2>Vehicle Information</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input placeholder="Make" value={make} onChange={(e) => setMake(e.target.value)} />
        <input placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
        <input placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
      </div>

      <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );
}