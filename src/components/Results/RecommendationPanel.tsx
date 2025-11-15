import { TravelFormData } from "../TravelForm/TravelFormPage";
import { DollarSign, AlertTriangle, Star, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DestinationCard } from "./DestinationCard";
import { AlternativeDestinations } from "./AlternativeDestinations";
import { TripOverview } from "./TripOverview";

// Generate dynamic recommendation based on user preferences
const generateRecommendation = (formData: TravelFormData) => {
  // Determine destination based on preferences
  let destination = formData.destination;
  let country = "";
  let description = "";
  let whyThisLocation = "";
  let matchScore = 95;
  let bestSeason = "";
  let suggestedDates = "";
  let highlights: string[] = [];
  let alerts: string[] = [];
  let placesOfInterest: Array<{ name: string; city: string; description: string }> = [];
  let alternatives: { name: string; country: string; matchScore: number; highlight: string }[] = [];

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
      country = "Maldives";
      description = "A tropical paradise with crystal-clear turquoise waters and pristine white-sand beaches.";
      whyThisLocation = "Your preferences for relaxed vacation and beach activities make the Maldives an ideal choice. With over 1,000 coral islands, it offers unparalleled snorkeling, luxurious overwater bungalows, and the perfect setting for unwinding in paradise.";
      matchScore = 98;
      bestSeason = "November - April";
      suggestedDates = formData.startDate ? new Date(formData.startDate).toLocaleDateString() : "December - March (Dry Season)";
      placesOfInterest = [
        { name: "Conrad Maldives Rangali Island", city: "Rangali Island, Maldives", description: "Luxury resort with underwater restaurant" },
        { name: "Veligandu Island Beach", city: "Veligandu Island, Maldives", description: "Pristine white sand beach paradise" },
        { name: "Banana Reef", city: "North Male Atoll, Maldives", description: "World-class diving and snorkeling spot" }
      ];
      highlights = [
        "Stay in an overwater villa with direct lagoon access",
        "Snorkeling in pristine coral reefs with tropical fish",
        "Sunset dolphin watching cruise",
        "Private beach dinners under the stars",
        "World-class spa treatments with ocean views"
      ];
      alerts = [
        "Best weather November to April (dry season)",
        "Book luxury resorts 4-6 months in advance",
        "Some islands require seaplane transfers (additional cost)",
        "Alcohol only available at resort islands",
        "Ensure passport is valid for at least 6 months beyond travel dates",
        "US citizens: Check F-1 visa status before international travel",
        "Carry copies of passport, visa, and I-20 documents"
      ];
      alternatives = [
        { name: "Bora Bora", country: "French Polynesia", matchScore: 96, highlight: "Similar luxury with overwater bungalows" },
        { name: "Seychelles", country: "East Africa", matchScore: 94, highlight: "Pristine beaches with granite boulders" }
      ];
    } else if (hasCity && hasCultural) {
      destination = "Rome";
      country = "Italy";
      description = "The Eternal City, where ancient ruins meet Renaissance masterpieces and world-class cuisine.";
      whyThisLocation = "Rome perfectly matches your cultural interests and city exploration preferences. Walk through 2,000 years of history, from the Colosseum to the Vatican, while enjoying authentic Italian cuisine at every corner.";
      matchScore = 97;
      bestSeason = "April - May, September - October";
      suggestedDates = formData.startDate ? new Date(formData.startDate).toLocaleDateString() : "April - May (Spring)";
      placesOfInterest = [
        { name: "Colosseum", city: "Rome, Italy", description: "Ancient amphitheater and iconic landmark" },
        { name: "Vatican Museums", city: "Vatican City, Rome, Italy", description: "Home to Sistine Chapel and Renaissance masterpieces" },
        { name: "Trevi Fountain", city: "Rome, Italy", description: "Baroque fountain and romantic symbol of Rome" }
      ];
      highlights = [
        "Tour the iconic Colosseum and Roman Forum",
        "Marvel at the Sistine Chapel in Vatican Museums",
        "Explore charming Trastevere neighborhood at night",
        "Enjoy authentic Roman pasta: carbonara, cacio e pepe",
        "Throw a coin in the baroque Trevi Fountain"
      ];
      alerts = [
        "Summer (June-August) is extremely hot and crowded",
        "Book Vatican tickets online 2-3 weeks in advance",
        "Many museums and sites close on Mondays",
        "Dress code required for churches (covered shoulders/knees)"
      ];
      alternatives = [
        { name: "Florence", country: "Italy", matchScore: 95, highlight: "Renaissance art capital with Uffizi Gallery" },
        { name: "Athens", country: "Greece", matchScore: 93, highlight: "Ancient history with Acropolis and Parthenon" }
      ];
    } else if (hasFood && hasCultural) {
      destination = "Bangkok";
      country = "Thailand";
      description = "A vibrant metropolis where golden temples meet world-famous street food and bustling markets.";
      whyThisLocation = "Bangkok is perfect for your food and cultural interests. Experience one of the world's best street food scenes alongside ornate temples, floating markets, and the famous Thai hospitality.";
      matchScore = 96;
      bestSeason = "November - February";
      suggestedDates = formData.startDate ? new Date(formData.startDate).toLocaleDateString() : "December - February (Cool Season)";
      placesOfInterest = [
        { name: "Grand Palace", city: "Bangkok, Thailand", description: "Ornate royal temple complex" },
        { name: "Yaowarat Road", city: "Bangkok, Thailand", description: "Legendary Chinatown street food haven" },
        { name: "Damnoen Saduak Floating Market", city: "Ratchaburi, Thailand", description: "Traditional floating market experience" }
      ];
      highlights = [
        "Street food tour in legendary Chinatown (Yaowarat Road)",
        "Visit the Grand Palace and Wat Phra Kaew temple complex",
        "Take an authentic Thai cooking class",
        "Explore Damnoen Saduak floating market",
        "Experience rooftop bars with stunning city views"
      ];
      alerts = [
        "Avoid rainy season (July-October) - frequent flooding",
        "Dress modestly when visiting temples (long pants, covered shoulders)",
        "Be cautious of common tourist scams",
        "Learn basic Thai phrases for better interactions"
      ];
      alternatives = [
        { name: "Hanoi", country: "Vietnam", matchScore: 94, highlight: "Amazing street food and French colonial architecture" },
        { name: "Penang", country: "Malaysia", matchScore: 92, highlight: "UNESCO food capital with diverse cuisine" }
      ];
    } else if (hasRoadTrip) {
      destination = "Reykjavík";
      country = "Iceland";
      description = "Land of fire and ice, with dramatic landscapes, geothermal wonders, and the famous Ring Road.";
      whyThisLocation = "Iceland is ideal for road trip enthusiasts. The Ring Road offers breathtaking landscapes around every turn - from waterfalls and glaciers to volcanic black sand beaches and the Northern Lights.";
      matchScore = 97;
      bestSeason = "June - August (Summer), September - March (Northern Lights)";
      suggestedDates = formData.startDate ? new Date(formData.startDate).toLocaleDateString() : "July - August (Midnight Sun)";
      placesOfInterest = [
        { name: "Geysir", city: "Haukadalur, Iceland", description: "Active geyser on the Golden Circle" },
        { name: "Blue Lagoon", city: "Grindavík, Iceland", description: "World-famous geothermal spa" },
        { name: "Black Sand Beach Reynisfjara", city: "Vík, Iceland", description: "Dramatic volcanic black sand beach" }
      ];
      highlights = [
        "Drive the legendary Golden Circle route (Geysir, Gullfoss)",
        "Chase the magical Northern Lights (September-March)",
        "Relax in natural hot springs like Blue Lagoon",
        "Explore dramatic black sand beaches of Vík",
        "Visit stunning ice caves and glaciers in Vatnajökull"
      ];
      alerts = [
        "Summer (June-August) has 24-hour daylight - bring eye masks",
        "Winter roads can be dangerous - 4WD recommended",
        "Weather changes rapidly - pack layers",
        "Book accommodations 3-6 months in advance",
        "Passport must be valid for at least 3 months beyond departure from Schengen Area",
        "F-1 visa holders: Verify travel signature on I-20 before departure",
        "Register with STEP (Smart Traveler Enrollment Program) for US citizens"
      ];
      alternatives = [
        { name: "Norway", country: "Scandinavia", matchScore: 95, highlight: "Fjords, Northern Lights, and scenic drives" },
        { name: "New Zealand", country: "Oceania", matchScore: 93, highlight: "Diverse landscapes and adventure activities" }
      ];
    } else if (hasCity) {
      destination = "Barcelona";
      country = "Spain";
      description = "A vibrant coastal city blending Gaudí's surreal architecture with Mediterranean beaches and tapas culture.";
      whyThisLocation = "Barcelona offers the perfect urban experience with its mix of stunning architecture, beach life, and world-class food. Explore Gaudí's masterpieces, enjoy Mediterranean cuisine, and soak up the lively Catalan culture.";
      matchScore = 96;
      bestSeason = "May - June, September - October";
      suggestedDates = formData.startDate ? new Date(formData.startDate).toLocaleDateString() : "May - June (Late Spring)";
      placesOfInterest = [
        { name: "Sagrada Familia", city: "Barcelona, Spain", description: "Gaudí's iconic unfinished basilica" },
        { name: "Park Güell", city: "Barcelona, Spain", description: "Colorful mosaic park designed by Gaudí" },
        { name: "La Boqueria Market", city: "Barcelona, Spain", description: "Historic food market on Las Ramblas" }
      ];
      highlights = [
        "Visit the iconic Sagrada Familia and Park Güell",
        "Stroll down the famous Las Ramblas boulevard",
        "Relax at Barceloneta Beach with beach bars",
        "Try authentic tapas and vermouth in Gothic Quarter",
        "Watch sunset from Bunkers del Carmel with panoramic views"
      ];
      alerts = [
        "Pickpockets very common in tourist areas - stay vigilant",
        "Many shops close for siesta (2-5 PM)",
        "Book Sagrada Familia tickets 2-4 weeks ahead online",
        "Avoid visiting during August - very hot and crowded",
        "Valid passport required for entry to Schengen Area",
        "Students on F-1 visa: Ensure I-20 has current travel signature",
        "Carry prescription medications in original containers with documentation"
      ];
      alternatives = [
        { name: "Lisbon", country: "Portugal", matchScore: 94, highlight: "Hills, trams, and coastal charm" },
        { name: "Valencia", country: "Spain", matchScore: 92, highlight: "Beach city with futuristic architecture" }
      ];
    } else {
      destination = "Seattle";
      country = "USA";
      description = "The Emerald City, where urban sophistication meets stunning natural beauty and coffee culture.";
      whyThisLocation = "Seattle offers a perfect blend of city attractions and outdoor adventures. Experience world-class coffee culture, innovative food scene, iconic landmarks, and easy access to mountains and water.";
      matchScore = 95;
      bestSeason = "June - September";
      suggestedDates = formData.startDate ? new Date(formData.startDate).toLocaleDateString() : "July - August (Summer)";
      placesOfInterest = [
        { name: "Pike Place Market", city: "Seattle, Washington, USA", description: "Historic public market and cultural landmark" },
        { name: "Space Needle", city: "Seattle, Washington, USA", description: "Iconic observation tower with stunning views" },
        { name: "Chihuly Garden and Glass", city: "Seattle, Washington, USA", description: "Stunning glass art museum" }
      ];
      highlights = [
        "Explore the bustling Pike Place Market and watch fish flying",
        "Visit the Space Needle and stunning Chihuly Garden and Glass",
        "Take a scenic ferry to Bainbridge Island",
        "Coffee culture tour - birthplace of Starbucks",
        "Hiking in nearby Mount Rainier or Olympic National Park"
      ];
      alerts = [
        "Rainy season October to May - pack waterproof layers",
        "Downtown parking is expensive - use public transit",
        "Book popular restaurants (especially seafood) in advance",
        "Summers are mild but can be overcast",
        "ID required for all domestic travel - bring valid driver's license or passport",
        "International students: Keep I-20 and passport accessible for potential checks",
        "TSA PreCheck recommended for faster security screening"
      ];
      alternatives = [
        { name: "Portland", country: "USA", matchScore: 93, highlight: "Food trucks, coffee, and quirky culture" },
        { name: "Vancouver", country: "Canada", matchScore: 92, highlight: "City surrounded by mountains and ocean" }
      ];
    }
  } else {
    // User provided destination - generate generic but relevant content
    destination = formData.destination;
    country = "Custom Destination";
    description = "Your chosen destination offers unique experiences and attractions.";
    whyThisLocation = `Based on your budget of $${formData.budget.toLocaleString()} and ${formData.duration} days, this is an excellent choice for your travel style and preferences.`;
    matchScore = 90;
    bestSeason = "Year-round";
    suggestedDates = formData.startDate ? new Date(formData.startDate).toLocaleDateString() : "Flexible dates";
    placesOfInterest = [
      { name: `Main Attraction in ${destination}`, city: destination, description: "Top landmark to visit" },
      { name: `Historic Site in ${destination}`, city: destination, description: "Cultural heritage location" },
      { name: `Local Market in ${destination}`, city: destination, description: "Authentic local experience" }
    ];
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
      "Book accommodations well in advance",
      "Ensure passport validity for at least 6 months",
      "F-1 students: Carry valid I-20 and all immigration documents",
      "Register travel plans with local embassy if traveling to high-risk areas"
    ];
  }

  // Calculate travel style matches
  const travelStyles = [
    { name: "Family-Friendly", score: formData.children > 0 ? 92 : 78 },
    { name: "Adventure", score: formData.preferences.includes("roadtrip") ? 95 : 70 },
    { name: "Cultural", score: formData.preferences.includes("cultural") ? 98 : 75 },
    { name: "Relaxation", score: formData.preferences.includes("relaxed") ? 96 : 72 }
  ].sort((a, b) => b.score - a.score).slice(0, 3);

  return {
    destination,
    country,
    description,
    whyThisLocation,
    matchScore,
    bestSeason,
    suggestedDates,
    highlights,
    alerts,
    placesOfInterest,
    alternatives,
    travelStyles,
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
  isGenerating,
  onCompareServices 
}: { 
  formData: TravelFormData;
  isGenerating: boolean;
  onCompareServices?: () => void;
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
      <DestinationCard 
        destination={recommendation.destination}
        country={recommendation.country}
        description={recommendation.description}
        whyThisLocation={recommendation.whyThisLocation}
        matchScore={recommendation.matchScore}
      />
      
      {/* Alternative Destinations */}
      <AlternativeDestinations alternatives={recommendation.alternatives} />

      {/* Places of Interest */}
      <Card className="glass-card rounded-2xl border-0 animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Places to Visit
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recommendation.placesOfInterest?.map((place, index) => (
            <div 
              key={index}
              className="p-4 rounded-xl bg-background/50 hover:bg-background/80 transition-all border border-border/50"
            >
              <h4 className="font-semibold text-foreground">{place.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">{place.description}</p>
            </div>
          ))}
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

        <TripOverview 
          duration={formData.duration}
          bestSeason={recommendation.bestSeason}
          suggestedDates={recommendation.suggestedDates}
          travelStyles={recommendation.travelStyles}
        />
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

      {/* Travel Service Comparison Button */}
      {onCompareServices && (
        <Card className="glass-card rounded-2xl border-0 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Ready to Book?</h3>
            <p className="text-muted-foreground mb-4">
              Compare travel services and find the best deals for your trip
            </p>
            <Button 
              onClick={onCompareServices}
              size="lg"
              className="gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Compare Travel Services
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
