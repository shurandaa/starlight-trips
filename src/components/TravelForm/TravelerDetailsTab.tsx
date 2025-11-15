import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Users, Baby, Minus, Plus } from "lucide-react";
import { TravelFormData } from "./TravelFormPage";

export const TravelerDetailsTab = ({
  formData,
  setFormData,
}: {
  formData: TravelFormData;
  setFormData: (data: TravelFormData) => void;
}) => {
  const updateCount = (type: "adults" | "children", delta: number) => {
    const newValue = Math.max(0, formData[type] + delta);
    if (type === "adults" && newValue === 0) return; // At least 1 adult required
    setFormData({ ...formData, [type]: newValue });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <Label className="text-base mb-4 block">Number of Travelers</Label>
        <p className="text-sm text-muted-foreground mb-6">
          Specify how many people will be traveling
        </p>
      </div>

      {/* Adults */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <Label className="text-base font-semibold">Adults</Label>
              <p className="text-sm text-muted-foreground">Ages 18+</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => updateCount("adults", -1)}
              disabled={formData.adults <= 1}
              className="h-10 w-10 rounded-xl"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-2xl font-bold w-12 text-center">{formData.adults}</span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => updateCount("adults", 1)}
              className="h-10 w-10 rounded-xl"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Children */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-secondary/10">
              <Baby className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <Label className="text-base font-semibold">Children</Label>
              <p className="text-sm text-muted-foreground">Ages 0-17</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => updateCount("children", -1)}
              disabled={formData.children <= 0}
              className="h-10 w-10 rounded-xl"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-2xl font-bold w-12 text-center">{formData.children}</span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => updateCount("children", 1)}
              className="h-10 w-10 rounded-xl"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
        <p className="text-center text-sm">
          <span className="font-semibold">Total Travelers:</span>{" "}
          <span className="text-lg font-bold text-accent">
            {formData.adults + formData.children}
          </span>
        </p>
      </div>
    </div>
  );
};
