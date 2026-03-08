import { useEffect, useState } from "react";
import type { WizardFormData } from "../../../types/wizard";
import type { QuoteRequestPayload } from "../../../types/api";

interface Props {
  formData: WizardFormData;
  prevStep: () => void;
}

interface QuoteResponse {
  premium: number;
  riskLevel: string;
}

export default function RateResultStep({ formData, prevStep }: Props) {
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Convert WizardFormData to QuoteRequestPayload if needed
  const payload: QuoteRequestPayload = {
    personal: formData.personal,
    vehicle: formData.vehicle,
    driver: formData.driver,
    final: formData.final,
  };

  useEffect(() => {
    async function fetchQuote() {
      setLoading(true);
      try {
        const response = await fetch("/api/quote/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data: QuoteResponse = await response.json();
        setQuote(data);
      } catch (err) {
        console.error("Error fetching quote:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuote();
  }, [payload]);

  return (
    <div style={{ maxWidth: "500px" }}>
      <h2>Your Quote Result</h2>
      <p>Here is your simulated premium estimate.</p>

      <pre>{JSON.stringify(payload, null, 2)}</pre>

      {loading ? (
        <p>Calculating...</p>
      ) : quote ? (
        <p>
          Estimated Monthly Premium: <strong>${quote.premium.toFixed(2)}</strong>
          <br />
          Risk Level: <strong>{quote.riskLevel}</strong>
        </p>
      ) : (
        <p>Failed to fetch quote. Please try again.</p>
      )}

      <div style={{ marginTop: "30px" }}>
        <button onClick={prevStep}>Back</button>
      </div>
    </div>
  );
}