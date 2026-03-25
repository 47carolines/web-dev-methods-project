import type { WizardFormData } from "../../../types/wizard";

interface Props {
  formData: WizardFormData; // Pass the whole form data, not just final
  nextStep: () => void;
  prevStep: () => void;
}

export default function FinalDetailsStep({ formData, nextStep, prevStep }: Props) {
  const { personal, vehicle, driver, final } = formData;

  return (
    <div style={{ maxWidth: "600px" }}>
      <h2>Final Details / Review</h2>
      <p>Review your information before generating your quote.</p>

      <section style={{ marginBottom: "20px" }}>
        <h3>Personal Info</h3>
        <p><strong>Full Name:</strong> {personal.fullName}</p>
        <p><strong>Date of Birth:</strong> {personal.dob}</p>
        <p><strong>Email:</strong> {personal.email}</p>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h3>Vehicle Info</h3>
        <p><strong>Make:</strong> {vehicle.make}</p>
        <p><strong>Model:</strong> {vehicle.model}</p>
        <p><strong>Year:</strong> {vehicle.year}</p>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h3>Driver Info</h3>
        <p><strong>Age:</strong> {driver.age}</p>
        <p><strong>Years Licensed:</strong> {driver.licenseYears}</p>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h3>Final Details</h3>
        <p><strong>Agreed to Terms:</strong> {final.agreeTerms ? "Yes" : "No"}</p>
        <p><strong>Coverage Type:</strong> {final.coverageType || "N/A"}</p>
        <p><strong>Notes:</strong> {final.notes || "N/A"}</p>
      </section>

      <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Confirm & Get Quote</button>
      </div>
    </div>
  );
}