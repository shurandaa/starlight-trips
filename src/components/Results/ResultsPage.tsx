import { useState, useEffect } from "react";
import { RecommendationPanel } from "./RecommendationPanel";
import { GoogleMapPanel } from "./GoogleMapPanel";
import { TravelFormData } from "../TravelForm/TravelFormPage";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, ArrowLeft } from "lucide-react";
import beachBg from "@/assets/beach-bg.jpg";
import { toast } from "sonner";

// Helper function to determine destination places from formData
const getDestinationPlaces = (formData: TravelFormData) => {
  const hasRelaxed = formData.preferences.includes("relaxed");
  const hasBeach = formData.preferences.includes("beach");
  const hasCity = formData.preferences.includes("city");
  const hasCultural = formData.preferences.includes("cultural");
  const hasFood = formData.preferences.includes("food");
  const hasRoadTrip = formData.preferences.includes("roadtrip");

  if (hasBeach && hasRelaxed) {
    return {
      destination: "Maldives",
      places: [
        { name: "Conrad Maldives Rangali Island", city: "Maldives", description: "Luxury resort with underwater restaurant" },
        { name: "Veligandu Island Beach", city: "Maldives", description: "Pristine white sand beach paradise" },
        { name: "Banana Reef", city: "Maldives", description: "World-class diving and snorkeling spot" }
      ]
    };
  } else if (hasCity && hasCultural) {
    return {
      destination: "Rome",
      places: [
        { name: "Colosseum", city: "Rome", description: "Ancient amphitheater and iconic landmark" },
        { name: "Vatican Museums", city: "Rome", description: "Home to Sistine Chapel and Renaissance masterpieces" },
        { name: "Trevi Fountain", city: "Rome", description: "Baroque fountain and romantic symbol of Rome" }
      ]
    };
  } else if (hasFood && hasCultural) {
    return {
      destination: "Bangkok",
      places: [
        { name: "Grand Palace", city: "Bangkok", description: "Ornate royal temple complex" },
        { name: "Yaowarat Road", city: "Bangkok", description: "Legendary Chinatown street food haven" },
        { name: "Damnoen Saduak Floating Market", city: "Bangkok", description: "Traditional floating market experience" }
      ]
    };
  } else if (hasRoadTrip) {
    return {
      destination: "Reykjavík",
      places: [
        { name: "Geysir", city: "Reykjavík", description: "Active geyser on the Golden Circle" },
        { name: "Blue Lagoon", city: "Reykjavík", description: "World-famous geothermal spa" },
        { name: "Black Sand Beach Reynisfjara", city: "Vík", description: "Dramatic volcanic black sand beach" }
      ]
    };
  } else if (hasCity) {
    return {
      destination: "Barcelona",
      places: [
        { name: "Sagrada Familia", city: "Barcelona", description: "Gaudí's iconic unfinished basilica" },
        { name: "Park Güell", city: "Barcelona", description: "Colorful mosaic park designed by Gaudí" },
        { name: "La Boqueria Market", city: "Barcelona", description: "Historic food market on Las Ramblas" }
      ]
    };
  }

  if (formData.destination) {
    return {
      destination: formData.destination,
      places: [
        { name: `Main Attraction in ${formData.destination}`, city: formData.destination, description: "Top landmark to visit" },
        { name: `Historic Site in ${formData.destination}`, city: formData.destination, description: "Cultural heritage location" },
        { name: `Local Market in ${formData.destination}`, city: formData.destination, description: "Authentic local experience" }
      ]
    };
  }

  return {
    destination: "Seattle",
    places: [
      { name: "Pike Place Market", city: "Seattle", description: "Historic public market and cultural landmark" },
      { name: "Space Needle", city: "Seattle", description: "Iconic observation tower with stunning views" },
      { name: "Chihuly Garden and Glass", city: "Seattle", description: "Stunning glass art museum" }
    ]
  };
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
  const [currentDestinationData, setCurrentDestinationData] = useState<{
    destination: string;
    places: Array<{ name: string; city: string; description: string }>;
  } | null>(null);

  // Simulate AI generation and set destination places
  useEffect(() => {
    setIsGenerating(true);
    const timer = setTimeout(() => {
      setIsGenerating(false);
      setCurrentDestinationData(getDestinationPlaces(formData));
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
          {currentDestinationData && (
            <GoogleMapPanel 
              destination={currentDestinationData.destination}
              places={currentDestinationData.places}
            />
          )}
        </div>
      </div>
    </div>
  );
};
