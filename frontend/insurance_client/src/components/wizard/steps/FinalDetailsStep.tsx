import { useState } from "react";
import type { WizardFormData } from "../../../types/wizard";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

interface Props {
  formData: WizardFormData;
  updateData: (data: WizardFormData["final"]) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function FinalDetailsStep({ formData, updateData, nextStep, prevStep }: Props) {
  const { personal, vehicle, driver, final } = formData;
  const [agreed, setAgreed] = useState(final.agreeTerms || false);
  const [showAuthGate, setShowAuthGate] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const user = auth?.user;

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

    if (!user) {
      setShowAuthGate(true);
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

  return <>
    {showAuthGate && (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
      }}>
        <div style={{
          background: "white",
          padding: "24px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "400px",
          textAlign: "center"
        }}>
          <h3>Save your quote</h3>
          <p>
            Create an account or log in to view your personalized insurance quote.
          </p>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "20px"
          }}>
            
    <button
      onClick={() => navigate("/register")}
      style={{
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#2563eb",
        color: "white",
        fontWeight: 600,
        cursor: "pointer"
      }}
    >
      Create Account
    </button>

    <button
      onClick={() => navigate("/login")}
      style={{
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        backgroundColor: "white",
        color: "#333",
        fontWeight: 500,
        cursor: "pointer"
      }}
    >
      I already have an account
    </button>

    <button
      onClick={() => setShowAuthGate(false)}
      style={{
        padding: "10px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#f3f4f6",
        color: "#6b7280",
        cursor: "pointer"
      }}
    >
      Not now
    </button>

  </div>
        </div>
      </div>
    )}

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
  </>;
}