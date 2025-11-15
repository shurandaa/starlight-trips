import { MapPin, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AlternativeDestination {
  name: string;
  country: string;
  matchScore: number;
  highlight: string;
}

interface AlternativeDestinationsProps {
  alternatives: AlternativeDestination[];
}

export const AlternativeDestinations = ({ alternatives }: AlternativeDestinationsProps) => {
  if (alternatives.length === 0) return null;

  return (
    <Card className="glass-card rounded-2xl border-0 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-secondary" />
          Alternative Destinations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alternatives.map((alt, index) => (
          <div 
            key={index} 
            className="p-4 rounded-xl bg-background/50 hover:bg-background/80 transition-all border border-border/50"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold">{alt.name}</h4>
                <p className="text-xs text-muted-foreground">{alt.country}</p>
              </div>
              <Badge variant="outline" className="gap-1">
                <TrendingUp className="w-3 h-3" />
                {alt.matchScore}%
              </Badge>
            </div>
            <p className="text-sm text-foreground/70">{alt.highlight}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
