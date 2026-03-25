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
  prevStep,
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
      <label>Full Name</label><br />
      <input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <br/><br/><label>Date of Birth</label><br />
      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <br/><br/><label>Email</label><br />
      <input
        type="email"
        placeholder="email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div style={{ marginTop: "20px" }}>
        <button onClick={prevStep}>Back</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}