import { useState } from "react";
import { AuthPage } from "@/components/Auth/AuthPage";
import { TravelFormPage, TravelFormData } from "@/components/TravelForm/TravelFormPage";
import { ResultsPage } from "@/components/Results/ResultsPage";
import { TravelServiceComparison } from "@/components/Results/TravelServiceComparison";
import { BookingPage } from "@/components/Results/BookingPage";

type AppState = "auth" | "form" | "results" | "comparison" | "booking";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("auth");
  const [travelData, setTravelData] = useState<TravelFormData | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);

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

  const handleCompareServices = () => {
    setAppState("comparison");
  };

  const handleBooking = (serviceId: number) => {
    setSelectedServiceId(serviceId);
    setAppState("booking");
  };

  const handleBackToResults = () => {
    setAppState("results");
  };

  const handleBackToComparison = () => {
    setAppState("comparison");
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
          onCompareServices={handleCompareServices}
        />
      )}
      {appState === "comparison" && travelData && (
        <TravelServiceComparison
          destination={travelData.destination || "your destination"}
          onBack={handleBackToResults}
          onBooking={handleBooking}
        />
      )}
      {appState === "booking" && travelData && selectedServiceId && (
        <BookingPage
          serviceId={selectedServiceId}
          destination={travelData.destination || "your destination"}
          onBack={handleBackToComparison}
        />
      )}
    </>
  );
};

export default Index;
