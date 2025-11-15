import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BasicInfoTab } from "./BasicInfoTab";
import { PreferencesTab } from "./PreferencesTab";
import { TravelerDetailsTab } from "./TravelerDetailsTab";
import { ProfileSettingsSheet } from "@/components/ProfileSettings/ProfileSettingsSheet";
import { Sparkles } from "lucide-react";
import mountainBg from "@/assets/mountain-bg.jpg";

export interface TravelFormData {
  budget: number;
  destination: string;
  adults: number;
  children: number;
  duration: number;
  startDate: Date | undefined;
  preferences: string[];
}

export const TravelFormPage = ({ onGenerate }: { onGenerate: (data: TravelFormData) => void }) => {
  const [formData, setFormData] = useState<TravelFormData>({
    budget: 3000,
    destination: "",
    adults: 2,
    children: 0,
    duration: 7,
    startDate: undefined,
    preferences: [],
  });

  const handleSubmit = () => {
    onGenerate(formData);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4">
      {/* Anime Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${mountainBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/20" />
      </div>

      {/* Main Form Card */}
      <div className="relative z-10 w-full max-w-4xl my-8">
        <div className="glass-card rounded-3xl p-8 shadow-2xl glow animate-fade-in">
          <div className="mb-8">
            <div className="flex justify-end mb-4">
              <ProfileSettingsSheet />
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2 text-glow bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Plan Your Dream Trip
              </h1>
              <p className="text-muted-foreground">
                Tell us your preferences and let AI create the perfect itinerary
              </p>
            </div>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted/50 p-1 rounded-2xl h-auto">
              <TabsTrigger 
                value="basic"
                className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
              >
                Basic Info
              </TabsTrigger>
              <TabsTrigger 
                value="preferences"
                className="rounded-xl data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground py-3"
              >
                Preferences
              </TabsTrigger>
              <TabsTrigger 
                value="travelers"
                className="rounded-xl data-[state=active]:bg-accent data-[state=active]:text-accent-foreground py-3"
              >
                Travelers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-0">
              <BasicInfoTab formData={formData} setFormData={setFormData} />
            </TabsContent>

            <TabsContent value="preferences" className="mt-0">
              <PreferencesTab formData={formData} setFormData={setFormData} />
            </TabsContent>

            <TabsContent value="travelers" className="mt-0">
              <TravelerDetailsTab formData={formData} setFormData={setFormData} />
            </TabsContent>
          </Tabs>

          <div className="mt-8 pt-6 border-t border-border/50">
            <Button
              onClick={handleSubmit}
              className="w-full h-14 text-lg font-bold rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-2xl hover:scale-105 transition-all glow"
            >
              <Sparkles className="mr-2 w-5 h-5" />
              Generate My AI Travel Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
