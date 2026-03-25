import { useState } from "react";
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
}: Props) {
  const [fullName, setFullName] = useState(data.fullName);
  const [dob, setDob] = useState(data.dob);
  const [email, setEmail] = useState(data.email);

  const handleNext = () => {
    updateData({ fullName, dob, email });
    nextStep();
  };

  return (
    <div style={{ maxWidth: "500px" }}>
      <h2>Let's talk about you!</h2>

      <label style={{ display: "block", marginBottom: "12px" }}>
        Full Name
        <input
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </label>

      <label style={{ display: "block", marginBottom: "12px" }}>
        Date of Birth
        <input
          name="dob"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </label>

      <label style={{ display: "block", marginBottom: "12px" }}>
        Email
        <input
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </label>

      <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}