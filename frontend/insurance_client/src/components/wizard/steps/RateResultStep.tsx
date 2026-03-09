import { useEffect, useState, useMemo } from "react";
import type { WizardFormData } from "../../../types/wizard";
const API_URL = import.meta.env.VITE_API_URL;

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

  const payload = useMemo(
    () => ({
      ...formData,
    }),
    [formData]
  );

  useEffect(() => {
    async function fetchQuote() {
      try {
        const response = await fetch(`${API_URL}/api/quote/calculate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data: QuoteResponse = await response.json();
        setQuote(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuote();
  }, [payload]);

  return (
    <div style={{ maxWidth: "500px" }}>
      <h2>Your Quote Result</h2>

      {loading && <p>Calculating...</p>}

      {quote && (
        <p>
          Estimated Premium: ${quote.premium.toFixed(2)}
          <br />
          Risk Level: {quote.riskLevel}
        </p>
      )}

      <button onClick={prevStep}>Back</button>
    </div>
  );
}