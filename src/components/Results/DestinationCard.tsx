import { MapPin, Star, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook } from "lucide-react";

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

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
  const handleSocialClick = (platform: string) => {
    const query = encodeURIComponent(`${destination} travel`);
    const urls = {
      instagram: `https://www.instagram.com/explore/tags/${destination.toLowerCase().replace(/\s+/g, '')}/`,
      x: `https://x.com/search?q=${query}`,
      facebook: `https://www.facebook.com/search/top?q=${query}`
    };
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

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
            <p className="text-white/90 text-sm leading-relaxed mb-4">{description}</p>
            
            <div className="flex items-center gap-2">
              <span className="text-white/80 text-xs mr-1">Explore on:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSocialClick('instagram')}
                className="h-8 w-8 p-0 bg-white/10 hover:bg-white/20 text-white"
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSocialClick('x')}
                className="h-8 w-8 p-0 bg-white/10 hover:bg-white/20 text-white"
              >
                <XIcon />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSocialClick('facebook')}
                className="h-8 w-8 p-0 bg-white/10 hover:bg-white/20 text-white"
              >
                <Facebook className="w-4 h-4" />
              </Button>
            </div>
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
