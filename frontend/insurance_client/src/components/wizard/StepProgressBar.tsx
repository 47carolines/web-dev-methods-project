interface Props {
  steps: string[];
  currentStep: number;
}

export default function StepProgressBar({
  steps,
  currentStep,
}: Props) {
  return (
    <div style={{ padding: "20px 40px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={step} style={{ textAlign: "center", flex: 1 }}>
              <div
                style={{
                  height: "8px",
                  borderRadius: "4px",
                  marginBottom: "8px",
                  background: isCompleted
                    ? "#2563eb"
                    : isActive
                    ? "#60a5fa"
                    : "#d1d5db",
                  transition: "0.2s",
                }}
              />

              <div
                style={{
                  fontSize: "13px",
                  color: isActive ? "#2563eb" : "#6b7280",
                }}
              >
                {step}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}