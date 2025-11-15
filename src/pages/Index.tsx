import { useState } from "react";
import { AuthPage } from "@/components/Auth/AuthPage";
import { TravelFormPage, TravelFormData } from "@/components/TravelForm/TravelFormPage";
import { ResultsPage } from "@/components/Results/ResultsPage";

type AppState = "auth" | "form" | "results";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("auth");
  const [travelData, setTravelData] = useState<TravelFormData | null>(null);

  const handleAuthSuccess = () => {
    setAppState("form");
  };

  const handleGenerate = (data: TravelFormData) => {
    setTravelData(data);
    setAppState("results");
  };

  const handleBack = () => {
    setAppState("form");
  };

  const handleRegenerate = () => {
    // Trigger regeneration with same data
    if (travelData) {
      handleGenerate(travelData);
    }
  };

  return (
    <>
      {appState === "auth" && <AuthPage onAuthSuccess={handleAuthSuccess} />}
      {appState === "form" && <TravelFormPage onGenerate={handleGenerate} />}
      {appState === "results" && travelData && (
        <ResultsPage 
          formData={travelData} 
          onBack={handleBack}
          onRegenerate={handleRegenerate}
        />
      )}
    </>
  );
};

export default Index;
