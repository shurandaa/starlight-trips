import { MapPin, Star, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DestinationCardProps {
  destination: string;
  country: string;
  description: string;
  whyThisLocation: string;
  matchScore: number;
}

export const DestinationCard = ({ 
  destination, 
  country, 
  description, 
  whyThisLocation,
  matchScore 
}: DestinationCardProps) => {
  return (
    <Card className="glass-card rounded-3xl border-0 overflow-hidden animate-fade-in">
      <div className="bg-gradient-to-r from-primary to-accent p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-1">{destination}</h2>
            <div className="flex items-center gap-2 text-white/90 mb-3">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{country}</span>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">{description}</p>
          </div>
          <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
            <Star className="w-3 h-3 mr-1 fill-current" />
            Perfect Match
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-accent/10 p-2 mt-0.5">
            <TrendingUp className="w-4 h-4 text-accent" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold mb-1 flex items-center gap-2">
              Why This Location?
              <span className="text-xs font-normal text-muted-foreground">
                Match Score: {matchScore}%
              </span>
            </h4>
            <p className="text-sm text-foreground/80 leading-relaxed">{whyThisLocation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
