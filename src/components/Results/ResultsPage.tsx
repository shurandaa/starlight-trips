import { useState } from "react";
import { RecommendationPanel } from "./RecommendationPanel";
import { MapPanel } from "./MapPanel";
import { TravelFormData } from "../TravelForm/TravelFormPage";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, ArrowLeft } from "lucide-react";
import beachBg from "@/assets/beach-bg.jpg";
import { toast } from "sonner";

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

  // Simulate AI generation
  useState(() => {
    setTimeout(() => setIsGenerating(false), 3000);
  });

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
          <MapPanel destination={formData.destination || "Paris"} />
        </div>
      </div>
    </div>
  );
};
