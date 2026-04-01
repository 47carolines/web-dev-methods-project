import { useEffect, useState, useMemo, useContext, useRef } from "react";
import type { WizardFormData } from "../../../types/wizard";
import { AuthContext } from "../../../context/AuthContext";
const API_URL = import.meta.env.VITE_API_URL;

interface Props {
  formData: WizardFormData;
  prevStep: () => void;
}

interface CoverageBreakdown {
  coverage: string;
  amount: number;
}

interface QuoteResponse {
  premium_total: number;
  risk_level: string;
  breakdown: CoverageBreakdown[];
}

export default function RateResultStep({ formData, prevStep }: Props) {
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  const auth = useContext(AuthContext);
  const user = auth?.user;

  const payload = useMemo(
    () => ({
      ...formData,
      userId: user?.id,
    }),
    [formData, user?.id]
  );

  useEffect(() => {
    if (hasFetched.current) return; // 🚫 block second run (StrictMode)
    hasFetched.current = true;      // ✅ mark as already called

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
        <div>
          <p>
            Estimated Premium: ${Number(quote.premium_total).toFixed(2)}
            <br />
            Risk Level: {quote.risk_level}
          </p>

          <h3>Coverage Breakdown:</h3>
          <ul>
            {quote.breakdown.map((b, index) => (
              <li key={index}>
                {b.coverage}: ${Number(b.amount).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={prevStep}>Back</button>
    </div>
  );
}