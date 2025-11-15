import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export const MapPanel = ({ destination }: { destination: string }) => {
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDsFoMJksCFdVKYh73eYENHLKgQ9ihRy84&q=${encodeURIComponent(destination)}`;

  return (
    <Card className="glass-card rounded-3xl border-0 h-full flex flex-col overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-accent to-primary/50 p-4">
        <CardTitle className="flex items-center gap-2 text-white">
          <MapPin className="w-5 h-5" />
          Location Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 relative">
        <iframe
          src={mapUrl}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map of ${destination}`}
        />
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
