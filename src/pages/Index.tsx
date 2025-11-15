import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TravelFormPage, TravelFormData } from "@/components/TravelForm/TravelFormPage";
import { ResultsPage } from "@/components/Results/ResultsPage";
import { TravelServiceComparison } from "@/components/Results/TravelServiceComparison";
import { BookingPage } from "@/components/Results/BookingPage";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type AppState = "form" | "results" | "comparison" | "booking";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [appState, setAppState] = useState<AppState>("form");
  const [travelData, setTravelData] = useState<TravelFormData | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      if (!session) {
        navigate("/auth");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/auth");
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

  if (isAuthenticated === null) {
    return null; // Loading state
  }

  return (
    <div className="relative">
      {isAuthenticated && (
        <div className="absolute top-4 right-4 z-50">
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      )}
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
    </div>
  );
};

export default Index;
