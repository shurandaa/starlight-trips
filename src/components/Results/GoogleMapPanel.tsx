import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Place {
  name: string;
  city: string;
  description: string;
  lat?: number;
  lng?: number;
}

interface GoogleMapPanelProps {
  destination: string;
  places: Place[];
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

export const GoogleMapPanel = ({ destination, places }: GoogleMapPanelProps) => {
  const mapRef = useRef<any>(null);
  const scriptLoadedRef = useRef(false);
  const [placesWithCoords, setPlacesWithCoords] = useState<Place[]>([]);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);

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

  // Geocode places using Google Geocoding API
  useEffect(() => {
    const geocodePlaces = async () => {
      const geocodedPlaces: Place[] = [];
      
      for (const place of places) {
        try {
          const query = encodeURIComponent(`${place.name}, ${place.city}`);
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=AIzaSyDsFoMJksCFdVKYh73eYENHLKgQ9ihRy84`
          );
          const data = await response.json();
          
          if (data.results && data.results[0]) {
            const location = data.results[0].geometry.location;
            geocodedPlaces.push({
              ...place,
              lat: location.lat,
              lng: location.lng
            });
          }
        } catch (error) {
          console.error(`Failed to geocode ${place.name}:`, error);
        }
      }
      
      setPlacesWithCoords(geocodedPlaces);
      
      // Set map center to first place
      if (geocodedPlaces.length > 0 && geocodedPlaces[0].lat && geocodedPlaces[0].lng) {
        setMapCenter({ lat: geocodedPlaces[0].lat, lng: geocodedPlaces[0].lng });
      }
    };

    if (places.length > 0) {
      geocodePlaces();
    }
  }, [places]);

  useEffect(() => {
    // Animate map to new location when center changes
    if (mapRef.current && mapCenter) {
      const timer = setTimeout(() => {
        mapRef.current.center = mapCenter;
        mapRef.current.zoom = 13;
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [mapCenter]);

  return (
    <Card className="glass-card rounded-3xl border-0 h-full flex flex-col overflow-hidden animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-accent to-primary/50 p-4">
        <CardTitle className="flex items-center gap-2 text-white">
          <MapPin className="w-5 h-5" />
          Location Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 relative">
        {mapCenter ? (
          <gmp-map
            ref={mapRef}
            center={`${mapCenter.lat},${mapCenter.lng}`}
            zoom="13"
            map-id="TRAVEL_MAP_ID"
            style={{ width: '100%', height: '100%' }}
          >
            {placesWithCoords.map((place, index) => (
              place.lat && place.lng && (
                <gmp-advanced-marker
                  key={index}
                  position={`${place.lat},${place.lng}`}
                  title={place.name}
                />
              )
            ))}
          </gmp-map>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Loading map...
          </div>
        )}
      </CardContent>
      
      {/* Places List */}
      <div className="p-4 border-t border-border/50 bg-background/30 max-h-40 overflow-y-auto">
        <div className="space-y-2">
          {placesWithCoords.map((place, index) => (
            <div key={index} className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-foreground">{place.name}</p>
                <p className="text-xs text-muted-foreground">{place.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
