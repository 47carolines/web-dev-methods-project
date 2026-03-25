import { useState } from "react";
import type { WizardFormData } from "../../../types/wizard";

interface Props {
  formData: WizardFormData;
  updateData: (data: WizardFormData["final"]) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function FinalDetailsStep({ formData, updateData, nextStep, prevStep }: Props) {
  const { personal, vehicle, driver, final } = formData;
  const [agreed, setAgreed] = useState(final.agreeTerms || false);

  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setAgreed(checked);
    // Update final section in wizard state
    updateData({ ...final, agreeTerms: checked});
  };

  const handleConfirm = () => {
    if (!agreed) {
      alert("You must agree to the terms to continue.");
      return;
    }
    nextStep();
  };

  const cardStyle: React.CSSProperties = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div style={{ maxWidth: "600px" }}>
      <h2>Review Your Quote</h2>
      <p>Check your information before generating your quote.</p>

      <div style={cardStyle}>
        <h3>Personal Info</h3>
        <p><strong>Full Name:</strong> {personal.fullName}</p>
        <p><strong>Date of Birth:</strong> {formatDate(personal.dob)}</p>
        <p><strong>Email:</strong> {personal.email}</p>
      </div>

      <div style={cardStyle}>
        <h3>Vehicle Info</h3>
        <p><strong>Make:</strong> {vehicle.make}</p>
        <p><strong>Model:</strong> {vehicle.model}</p>
        <p><strong>Year:</strong> {vehicle.year}</p>
      </div>

      <div style={cardStyle}>
        <h3>Driver Info</h3>
        <p><strong>Age:</strong> {driver.age}</p>
        <p><strong>Years Licensed:</strong> {driver.licenseYears}</p>
      </div>

    <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px" }}>
        <input
          type="checkbox"
          checked={agreed}
          onChange={handleAgreeChange}
          style={{ width: "16px", height: "16px", margin: 0 }}
        />
        I agree to the terms
      </label>
    </div>

      <div style={{ display: "flex", gap: "15px" }}>
        <button onClick={prevStep}>Back</button>
        <button onClick={handleConfirm}>Confirm & Get Quote</button>
      </div>
    </div>
  );
}