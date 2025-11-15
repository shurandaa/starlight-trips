import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Star } from "lucide-react";

interface TravelService {
  id: number;
  name: string;
  logo: string;
  price: number;
  rating: number;
  reviewCount: number;
  features: string[];
  highlight?: string;
}

const mockServices: TravelService[] = [
  {
    id: 1,
    name: "Budget Travel Co",
    logo: "🎒",
    price: 899,
    rating: 4.2,
    reviewCount: 1234,
    features: ["Basic accommodation", "Group tours", "Shared transport"],
    highlight: "Best Value"
  },
  {
    id: 2,
    name: "Travel Express",
    logo: "✈️",
    price: 1299,
    rating: 4.5,
    reviewCount: 2341,
    features: ["Standard hotels", "Guided tours", "Airport transfers"],
  },
  {
    id: 3,
    name: "Comfort Journeys",
    logo: "🏨",
    price: 1899,
    rating: 4.7,
    reviewCount: 3456,
    features: ["4-star hotels", "Private tours", "Premium transport"],
    highlight: "Most Popular"
  },
  {
    id: 4,
    name: "Luxury Escapes",
    logo: "💎",
    price: 3499,
    rating: 4.9,
    reviewCount: 987,
    features: ["5-star resorts", "VIP experiences", "Concierge service"],
    highlight: "Premium"
  },
].sort((a, b) => a.price - b.price);

interface TravelServiceComparisonProps {
  destination: string;
  onBack: () => void;
  onBooking: (serviceId: number) => void;
}

export const TravelServiceComparison = ({ destination, onBack, onBooking }: TravelServiceComparisonProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Itinerary
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Travel Service Comparison</h1>
          <p className="text-muted-foreground">
            Compare prices and services for your trip to {destination}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {mockServices.map((service) => (
            <Card key={service.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              {service.highlight && (
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                  {service.highlight}
                </Badge>
              )}
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{service.logo}</div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{service.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{service.rating}</span>
                      </div>
                      <span className="text-muted-foreground">({service.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">${service.price}</span>
                  <span className="text-muted-foreground">per person</span>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-sm">Includes:</p>
                  <ul className="space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => onBooking(service.id)}
                >
                  Book Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
