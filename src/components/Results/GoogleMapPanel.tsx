import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useEffect, useRef } from "react";

interface GoogleMapPanelProps {
  destination: string;
  lat: number;
  lng: number;
}

// Declare global types for Google Maps Web Components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gmp-map': any;
      'gmp-advanced-marker': any;
    }
  }
}

export const GoogleMapPanel = ({ destination, lat, lng }: GoogleMapPanelProps) => {
  const mapRef = useRef<any>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Load Google Maps script dynamically
    if (!scriptLoadedRef.current) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDsFoMJksCFdVKYh73eYENHLKgQ9ihRy84&libraries=maps,marker&v=beta`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      scriptLoadedRef.current = true;
    }
  }, []);

  useEffect(() => {
    // Animate map to new location when destination changes
    if (mapRef.current) {
      const timer = setTimeout(() => {
        mapRef.current.center = { lat, lng };
        mapRef.current.zoom = 12;
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [lat, lng]);

  return (
    <Card className="glass-card rounded-3xl border-0 h-full flex flex-col overflow-hidden animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-accent to-primary/50 p-4">
        <CardTitle className="flex items-center gap-2 text-white">
          <MapPin className="w-5 h-5" />
          Location Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 relative">
        <gmp-map
          ref={mapRef}
          center={`${lat},${lng}`}
          zoom="12"
          map-id="TRAVEL_MAP_ID"
          style={{ width: '100%', height: '100%' }}
        >
          <gmp-advanced-marker
            position={`${lat},${lng}`}
            title={destination}
          />
        </gmp-map>
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
