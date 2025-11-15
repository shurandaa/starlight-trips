import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Palmtree, 
  Building2, 
  Car, 
  Waves, 
  UtensilsCrossed, 
  Landmark, 
  ShoppingBag,
  Mountain 
} from "lucide-react";
import { TravelFormData } from "./TravelFormPage";

const preferenceOptions = [
  { id: "relaxed", label: "Relaxed Vacation", icon: Palmtree, color: "text-green-500" },
  { id: "city", label: "City Exploration", icon: Building2, color: "text-blue-500" },
  { id: "road-trip", label: "Road Trip", icon: Car, color: "text-orange-500" },
  { id: "beach", label: "Island/Beach", icon: Waves, color: "text-cyan-500" },
  { id: "food", label: "Food Tour", icon: UtensilsCrossed, color: "text-red-500" },
  { id: "culture", label: "Cultural Experience", icon: Landmark, color: "text-purple-500" },
  { id: "shopping", label: "Shopping", icon: ShoppingBag, color: "text-pink-500" },
  { id: "adventure", label: "Adventure", icon: Mountain, color: "text-emerald-500" },
];

export const PreferencesTab = ({
  formData,
  setFormData,
}: {
  formData: TravelFormData;
  setFormData: (data: TravelFormData) => void;
}) => {
  const togglePreference = (id: string) => {
    const newPreferences = formData.preferences.includes(id)
      ? formData.preferences.filter((p) => p !== id)
      : [...formData.preferences, id];
    setFormData({ ...formData, preferences: newPreferences });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <Label className="text-base mb-4 block">Travel Preferences</Label>
        <p className="text-sm text-muted-foreground mb-6">
          Select all that apply to help us personalize your trip
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {preferenceOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = formData.preferences.includes(option.id);
          
          return (
            <div
              key={option.id}
              onClick={() => togglePreference(option.id)}
              className={cn(
                "flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all cursor-pointer hover:scale-105",
                isSelected
                  ? "border-primary bg-primary/10 shadow-lg"
                  : "border-border/50 bg-background/30 hover:border-primary/50"
              )}
            >
              <Checkbox
                id={option.id}
                checked={isSelected}
                className="pointer-events-none"
              />
              <Icon className={cn("w-5 h-5", option.color)} />
              <label
                htmlFor={option.id}
                className="flex-1 text-sm font-medium cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};
