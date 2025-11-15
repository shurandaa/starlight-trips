import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPin, DollarSign, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { TravelFormData } from "./TravelFormPage";

export const BasicInfoTab = ({
  formData,
  setFormData,
}: {
  formData: TravelFormData;
  setFormData: (data: TravelFormData) => void;
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Budget */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base">
            <DollarSign className="w-4 h-4 text-primary" />
            Budget: ${formData.budget.toLocaleString()}
          </Label>
          <Slider
            value={[formData.budget]}
            onValueChange={(value) => setFormData({ ...formData, budget: value[0] })}
            min={500}
            max={10000}
            step={100}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$500</span>
            <span>$10,000</span>
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base">
            <Clock className="w-4 h-4 text-secondary" />
            Trip Duration: {formData.duration} days
          </Label>
          <Slider
            value={[formData.duration]}
            onValueChange={(value) => setFormData({ ...formData, duration: value[0] })}
            min={1}
            max={30}
            step={1}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 day</span>
            <span>30 days</span>
          </div>
        </div>
      </div>

      {/* Destination */}
      <div className="space-y-3">
        <Label htmlFor="destination" className="flex items-center gap-2 text-base">
          <MapPin className="w-4 h-4 text-accent" />
          Destination Preference
        </Label>
        <Input
          id="destination"
          placeholder="e.g., Tokyo, Paris, Bali..."
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          className="h-12 bg-background/50 border-border/50 rounded-xl"
        />
        <p className="text-xs text-muted-foreground">
          Leave empty to let AI suggest the perfect destination
        </p>
      </div>

      {/* Start Date */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-base">
          <CalendarIcon className="w-4 h-4 text-primary" />
          Preferred Travel Date
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full h-12 justify-start text-left font-normal rounded-xl bg-background/50 border-border/50",
                !formData.startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.startDate}
              onSelect={(date) => setFormData({ ...formData, startDate: date })}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
