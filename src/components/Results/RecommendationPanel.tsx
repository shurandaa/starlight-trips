import { TravelFormData } from "../TravelForm/TravelFormPage";
import { MapPin, DollarSign, Calendar, Users, AlertTriangle, Star, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Generate dynamic recommendation based on user preferences
const generateRecommendation = (formData: TravelFormData) => {
  // Determine destination based on preferences
  let destination = formData.destination;
  let reason = "";
  let highlights: string[] = [];
  let alerts: string[] = [];

  if (!destination) {
    // AI-like destination selection based on preferences
    const hasRelaxed = formData.preferences.includes("relaxed");
    const hasBeach = formData.preferences.includes("beach");
    const hasCity = formData.preferences.includes("city");
    const hasCultural = formData.preferences.includes("cultural");
    const hasFood = formData.preferences.includes("food");
    const hasRoadTrip = formData.preferences.includes("roadtrip");

    if (hasBeach && hasRelaxed) {
      destination = "Maldives";
      reason = "Perfect for a relaxed beach vacation with crystal-clear waters and overwater bungalows.";
      highlights = [
        "Stay in an overwater villa",
        "Snorkeling in pristine coral reefs",
        "Sunset dolphin watching cruise",
        "Private beach dinners",
        "Spa treatments with ocean views"
      ];
      alerts = [
        "Best weather November to April",
        "Book resorts 4-6 months in advance",
        "Some islands require seaplane transfers"
      ];
    } else if (hasCity && hasCultural) {
      destination = "Rome, Italy";
      reason = "Ideal for culture enthusiasts who want to explore ancient history and vibrant city life.";
      highlights = [
        "Tour the Colosseum and Roman Forum",
        "Visit Vatican Museums and Sistine Chapel",
        "Explore Trastevere neighborhood",
        "Enjoy authentic Italian cuisine",
        "Throw a coin in Trevi Fountain"
      ];
      alerts = [
        "Summer months are extremely crowded",
        "Book Vatican tickets online in advance",
        "Many sites close on Mondays"
      ];
    } else if (hasFood && hasCultural) {
      destination = "Bangkok, Thailand";
      reason = "A food lover's paradise with rich cultural heritage and amazing street food scene.";
      highlights = [
        "Street food tour in Chinatown",
        "Visit the Grand Palace and temples",
        "Take a cooking class",
        "Explore floating markets",
        "Experience rooftop bars"
      ];
      alerts = [
        "Avoid rainy season (July-October)",
        "Dress modestly when visiting temples",
        "Try to learn basic Thai phrases"
      ];
    } else if (hasRoadTrip) {
      destination = "Iceland";
      reason = "Perfect for adventure seekers with stunning landscapes and the famous Ring Road.";
      highlights = [
        "Drive the Golden Circle route",
        "Chase the Northern Lights",
        "Relax in natural hot springs",
        "Explore black sand beaches",
        "Visit ice caves and glaciers"
      ];
      alerts = [
        "Summer has 24-hour daylight",
        "Winter roads can be challenging",
        "Book accommodations early for peak season"
      ];
    } else if (hasCity) {
      destination = "Barcelona, Spain";
      reason = "Vibrant city with stunning architecture, beaches, and incredible food scene.";
      highlights = [
        "Visit Sagrada Familia and Park Güell",
        "Stroll down Las Ramblas",
        "Relax at Barceloneta Beach",
        "Try tapas in Gothic Quarter",
        "Watch sunset from Bunkers del Carmel"
      ];
      alerts = [
        "Pickpockets common in tourist areas",
        "Many shops close for siesta (2-5 PM)",
        "Book Sagrada Familia tickets weeks ahead"
      ];
    } else {
      destination = "Seattle, USA";
      reason = "Great all-around destination with nature, culture, and food in perfect balance.";
      highlights = [
        "Explore Pike Place Market",
        "Visit Space Needle and Chihuly Garden",
        "Take a ferry to nearby islands",
        "Coffee culture tour",
        "Hiking in nearby mountains"
      ];
      alerts = [
        "Rainy season October to May",
        "Downtown parking can be expensive",
        "Book popular restaurants in advance"
      ];
    }
  } else {
    // User provided destination - generate generic but relevant content
    reason = `Based on your budget of $${formData.budget.toLocaleString()} and ${formData.duration} days, this is an excellent choice for your travel style.`;
    highlights = [
      `Explore top attractions in ${destination}`,
      "Experience local cuisine and culture",
      "Visit popular landmarks and hidden gems",
      "Enjoy authentic local experiences",
      "Create unforgettable memories"
    ];
    alerts = [
      "Check visa requirements before booking",
      "Research local customs and etiquette",
      "Book accommodations well in advance"
    ];
  }

  return {
    destination,
    reason,
    highlights,
    alerts,
    budgetBreakdown: {
      accommodation: Math.round(formData.budget * 0.4),
      food: Math.round(formData.budget * 0.25),
      activities: Math.round(formData.budget * 0.2),
      transportation: Math.round(formData.budget * 0.15)
    }
  };
};

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

  // Generate dynamic recommendation based on actual user input
  const recommendation = generateRecommendation(formData);

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
              <span className="font-bold text-primary text-lg">${formData.budget.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="w-5 h-5 text-accent" />
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
              <span className="font-semibold">
                {formData.adults} {formData.adults === 1 ? 'Adult' : 'Adults'}
                {formData.children > 0 && `, ${formData.children} ${formData.children === 1 ? 'Child' : 'Children'}`}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Start Date</span>
              <span className="font-semibold">
                {formData.startDate ? new Date(formData.startDate).toLocaleDateString() : 'Flexible'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Travel Style</span>
              <div className="flex gap-1 flex-wrap justify-end">
                {formData.preferences.slice(0, 2).map((pref) => (
                  <Badge key={pref} variant="outline" className="text-xs">
                    {pref}
                  </Badge>
                ))}
                {formData.preferences.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{formData.preferences.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trip Highlights */}
      <Card className="glass-card rounded-2xl border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Trip Highlights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recommendation.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                <span className="text-foreground/80">{highlight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Important Alerts */}
      <Card className="glass-card rounded-2xl border-0 border-l-4 border-l-accent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent">
            <AlertTriangle className="w-5 h-5" />
            Important Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recommendation.alerts.map((alert, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                • {alert}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
