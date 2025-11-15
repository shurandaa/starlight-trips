import { Calendar, Sun, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TripOverviewProps {
  duration: number;
  bestSeason: string;
  suggestedDates: string;
  travelStyles: { name: string; score: number }[];
}

export const TripOverview = ({ 
  duration, 
  bestSeason, 
  suggestedDates, 
  travelStyles 
}: TripOverviewProps) => {
  return (
    <Card className="glass-card rounded-2xl border-0 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="w-5 h-5 text-accent" />
          Trip Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Recommended Duration</span>
            <span className="font-semibold">{duration} days</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Sun className="w-3 h-3" />
              Best Season
            </span>
            <span className="font-semibold">{bestSeason}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Suggested Dates</span>
            <span className="font-semibold text-sm">{suggestedDates}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-border/50">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            Travel Style Match
          </h4>
          <div className="space-y-2">
            {travelStyles.map((style, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{style.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {style.score}%
                  </Badge>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                    style={{ width: `${style.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
