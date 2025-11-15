import { useState, useEffect } from "react";
import { RecommendationPanel } from "./RecommendationPanel";
import { GoogleMapPanel } from "./GoogleMapPanel";
import { TravelFormData } from "../TravelForm/TravelFormPage";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, ArrowLeft } from "lucide-react";
import beachBg from "@/assets/beach-bg.jpg";
import { toast } from "sonner";

// Helper function to determine destination and coordinates from formData
const getDestinationData = (formData: TravelFormData): { destination: string; lat: number; lng: number } => {
  if (formData.destination) {
    return { destination: formData.destination, lat: 0, lng: 0 };
  }

  // Generate destination based on preferences - must match RecommendationPanel logic
  const hasRelaxed = formData.preferences.includes("relaxed");
  const hasBeach = formData.preferences.includes("beach");
  const hasCity = formData.preferences.includes("city");
  const hasCultural = formData.preferences.includes("cultural");
  const hasFood = formData.preferences.includes("food");
  const hasRoadTrip = formData.preferences.includes("roadtrip");

  if (hasBeach && hasRelaxed) return { destination: "Malé, Maldives", lat: 4.1755, lng: 73.5093 };
  if (hasCity && hasCultural) return { destination: "Rome, Italy", lat: 41.9028, lng: 12.4964 };
  if (hasFood && hasCultural) return { destination: "Bangkok, Thailand", lat: 13.7563, lng: 100.5018 };
  if (hasRoadTrip) return { destination: "Reykjavík, Iceland", lat: 64.1466, lng: -21.9426 };
  if (hasCity) return { destination: "Barcelona, Spain", lat: 41.3874, lng: 2.1686 };
  
  return { destination: "Seattle, USA", lat: 47.6062, lng: -122.3321 }; // Default
};

export const ResultsPage = ({ 
  formData, 
  onBack,
  onRegenerate 
}: { 
  formData: TravelFormData;
  onBack: () => void;
  onRegenerate: () => void;
}) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [destinationData, setDestinationData] = useState({ destination: "", lat: 0, lng: 0 });

  // Simulate AI generation and set destination
  useEffect(() => {
    setIsGenerating(true);
    const timer = setTimeout(() => {
      setIsGenerating(false);
      setDestinationData(getDestinationData(formData));
    }, 3000);
    return () => clearTimeout(timer);
  }, [formData]);

  const handleExportPDF = () => {
    toast.success("PDF export coming soon! 📄");
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Anime Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${beachBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      </div>

      {/* Header */}
      <div className="glass-card m-4 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center justify-between gap-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="gap-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Your AI Travel Plan
          </h1>

          <div className="flex gap-2">
            <Button
              onClick={onRegenerate}
              variant="outline"
              className="gap-2 rounded-xl"
            >
              <RefreshCw className="w-4 h-4" />
              Regenerate
            </Button>
            <Button
              onClick={handleExportPDF}
              variant="outline"
              className="gap-2 rounded-xl"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="flex gap-4 p-4 h-[calc(100vh-120px)]">
        {/* Left Column - AI Recommendations */}
        <div className="flex-1 overflow-y-auto">
          <RecommendationPanel formData={formData} isGenerating={isGenerating} />
        </div>

        {/* Right Column - Map */}
        <div className="w-[45%] min-w-[400px]">
          <GoogleMapPanel 
            destination={destinationData.destination}
            lat={destinationData.lat}
            lng={destinationData.lng}
          />
        </div>
      </div>
    </div>
  );
};
