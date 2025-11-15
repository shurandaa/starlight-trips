import { TravelFormData } from "../TravelForm/TravelFormPage";
import { MapPin, DollarSign, Calendar, Users, AlertTriangle, Star, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const RecommendationPanel = ({ 
  formData, 
  isGenerating 
}: { 
  formData: TravelFormData;
  isGenerating: boolean;
}) => {
  if (isGenerating) {
    return (
      <div className="glass-card rounded-3xl p-8 h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative w-24 h-24 mx-auto">
            <Sparkles className="w-24 h-24 text-primary animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-50 animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Creating Your Perfect Itinerary
          </h3>
          <p className="text-muted-foreground">Our AI is analyzing the best options for you...</p>
        </div>
      </div>
    );
  }

  // Mock AI generated content
  const recommendation = {
    destination: formData.destination || "Kyoto, Japan",
    reason: "Based on your preferences for cultural experience and relaxed vacation, Kyoto offers the perfect blend of ancient temples, beautiful gardens, and serene atmosphere.",
    highlights: [
      "Visit iconic Fushimi Inari Shrine",
      "Experience traditional tea ceremony",
      "Explore Arashiyama Bamboo Grove",
      "Stay in a traditional Ryokan",
      "Try authentic Kaiseki cuisine"
    ],
    budgetBreakdown: {
      accommodation: formData.budget * 0.4,
      food: formData.budget * 0.25,
      activities: formData.budget * 0.2,
      transportation: formData.budget * 0.15
    },
    alerts: [
      "Cherry blossom season (March-April) is peak tourist season",
      "Book accommodations 3 months in advance",
      "Some temples close early (around 5 PM)"
    ]
  };

  return (
    <div className="space-y-4">
      {/* Destination Card */}
      <Card className="glass-card rounded-3xl border-0 overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-accent p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{recommendation.destination}</h2>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Recommended Destination</span>
              </div>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Perfect Match
            </Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <p className="text-foreground/80 leading-relaxed">{recommendation.reason}</p>
        </CardContent>
      </Card>

      {/* Trip Details Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="glass-card rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="w-5 h-5 text-primary" />
              Budget Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(recommendation.budgetBreakdown).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="capitalize text-sm text-muted-foreground">{key}</span>
                <span className="font-semibold">${value.toLocaleString()}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-border/50 flex justify-between items-center">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold text-primary">${formData.budget.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="w-5 h-5 text-secondary" />
              Trip Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Duration</span>
              <span className="font-semibold">{formData.duration} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Travelers</span>
              <span className="font-semibold flex items-center gap-1">
                <Users className="w-4 h-4" />
                {formData.adults + formData.children}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Start Date</span>
              <span className="font-semibold">
                {formData.startDate ? formData.startDate.toLocaleDateString() : "Flexible"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Highlights */}
      <Card className="glass-card rounded-2xl border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            Trip Highlights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recommendation.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <span className="text-foreground/80">{highlight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card className="glass-card rounded-2xl border-0 border-l-4 border-l-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Important Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recommendation.alerts.map((alert, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-destructive mt-1">•</span>
                <span className="text-foreground/80">{alert}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
