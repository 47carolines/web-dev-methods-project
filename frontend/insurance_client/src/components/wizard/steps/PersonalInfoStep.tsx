import { useState, useEffect } from "react";
import type { PersonalData } from "../../../types/personal";
interface Props {
  data: PersonalData;
  updateData: (data: PersonalData) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function PersonalInfoStep({
  data,
  updateData,
  nextStep,
  prevStep
}: Props) {

  const [fullName, setFullName] = useState(data.fullName || "");
  const [dob, setDob] = useState(data.dob || "");
  const [email, setEmail] = useState(data.email || "");

  // Sync local state → wizard state
  useEffect(() => {
    updateData({
      fullName,
      dob,
      email
    });
  }, [fullName, dob, email]);

  return (
    <div style={{ maxWidth: "500px" }}>
      <h2>Let's talk about you!</h2>
      <p style={{ color: "#555" }}>
        Start your auto quote and see how much you can save.
      </p>

      <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>

        <div>
          <label>Full Name</label>
          <input
            style={{ width: "100%" }}
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <label>Date of Birth*</label>
          <input
            style={{ width: "100%" }}
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div>
          <label>Primary Email Address*</label>
          <input
            style={{ width: "100%" }}
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );
}