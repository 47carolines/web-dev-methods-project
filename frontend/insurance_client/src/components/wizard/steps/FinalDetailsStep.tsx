import type { FinalDetailsData } from "../../../types/final";

interface Props {
  data: FinalDetailsData;
  updateData: (data: FinalDetailsData) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function FinalDetailsStep({ data, updateData, nextStep, prevStep }: Props) {
  // Optional: you can add checkboxes, confirmation fields, or summary here
  return (
    <div style={{ maxWidth: "500px" }}>
      <h2>Final Details / Review</h2>
      <p>Review your information before generating your quote.</p>

      <pre>{JSON.stringify(data, null, 2)}</pre>

      <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Confirm & Get Quote</button>
      </div>
    </div>
  );
}