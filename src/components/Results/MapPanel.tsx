import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export const MapPanel = ({ destination }: { destination: string }) => {
  // Using Google Maps Embed API (static for now, can be enhanced with API key)
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(destination)}`;

  return (
    <Card className="glass-card rounded-3xl border-0 h-full flex flex-col overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-accent to-primary/50 p-4">
        <CardTitle className="flex items-center gap-2 text-white">
          <MapPin className="w-5 h-5" />
          Location Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 relative">
        {/* Map Placeholder - In production, use Google Maps API */}
        <div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
          <div className="text-center space-y-4 p-8">
            <MapPin className="w-16 h-16 mx-auto text-primary/50" />
            <div>
              <h3 className="text-xl font-semibold mb-2">{destination}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Interactive map will be displayed here
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Explore nearby attractions</p>
                <p>• View restaurants & hotels</p>
                <p>• Check landmarks & photos</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Uncomment when you have Google Maps API key */}
        {/* <iframe
          src={mapUrl}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        /> */}
      </CardContent>
      
      {/* Map Features */}
      <div className="p-4 border-t border-border/50 bg-background/30">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
            🏨 Hotels
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary">
            🍜 Restaurants
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent">
            🎭 Attractions
          </span>
        </div>
      </div>
    </Card>
  );
};
