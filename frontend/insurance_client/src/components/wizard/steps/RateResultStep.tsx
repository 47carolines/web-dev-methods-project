interface Props {
  formData: any;
  prevStep: () => void;
}

export default function RateResultStep({ formData, prevStep }: Props) {
  return (
    <div style={{ maxWidth: "500px" }}>
      <h2>Your Quote Result</h2>

      <p>Here is your simulated premium estimate.</p>

      <pre>{JSON.stringify(formData, null, 2)}</pre>

      <p>
        Estimated Monthly Premium: <strong>$123.45</strong>
      </p>

      <div style={{ marginTop: "30px" }}>
        <button onClick={prevStep}>Back</button>
      </div>
    </div>
  );
}