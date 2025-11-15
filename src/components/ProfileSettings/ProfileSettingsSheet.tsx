import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  date_of_birth?: string;
  visa_type?: string;
  nationality?: string;
  dietary_restrictions?: string[];
  passport_number?: string;
  passport_expiry?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
}

export const ProfileSettingsSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({});
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      loadProfile();
    }
  }, [isOpen]);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfile({
          date_of_birth: data.date_of_birth || '',
          visa_type: data.visa_type || '',
          nationality: data.nationality || '',
          dietary_restrictions: data.dietary_restrictions || [],
          passport_number: data.passport_number || '',
          passport_expiry: data.passport_expiry || '',
          emergency_contact_name: data.emergency_contact_name || '',
          emergency_contact_phone: data.emergency_contact_phone || '',
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to save profile settings",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          date_of_birth: profile.date_of_birth || null,
          visa_type: profile.visa_type || null,
          nationality: profile.nationality || null,
          dietary_restrictions: profile.dietary_restrictions || [],
          passport_number: profile.passport_number || null,
          passport_expiry: profile.passport_expiry || null,
          emergency_contact_name: profile.emergency_contact_name || null,
          emergency_contact_phone: profile.emergency_contact_phone || null,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile settings saved successfully",
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to save profile settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDietaryChange = (value: string) => {
    const current = profile.dietary_restrictions || [];
    if (current.includes(value)) {
      setProfile({
        ...profile,
        dietary_restrictions: current.filter(item => item !== value)
      });
    } else {
      setProfile({
        ...profile,
        dietary_restrictions: [...current, value]
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Settings className="h-4 w-4" />
          Profile Settings
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Profile Settings</SheetTitle>
          <SheetDescription>
            Manage your personal information and travel preferences
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6 py-6">
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={profile.date_of_birth || ''}
              onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationality">Nationality</Label>
            <Input
              id="nationality"
              placeholder="e.g., United States"
              value={profile.nationality || ''}
              onChange={(e) => setProfile({ ...profile, nationality: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="visa">Visa Type</Label>
            <Select
              value={profile.visa_type || ''}
              onValueChange={(value) => setProfile({ ...profile, visa_type: value })}
            >
              <SelectTrigger id="visa">
                <SelectValue placeholder="Select visa type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="F-1">F-1 (Student)</SelectItem>
                <SelectItem value="H-1B">H-1B (Work)</SelectItem>
                <SelectItem value="J-1">J-1 (Exchange)</SelectItem>
                <SelectItem value="B-1/B-2">B-1/B-2 (Tourist/Business)</SelectItem>
                <SelectItem value="Green Card">Green Card</SelectItem>
                <SelectItem value="Citizen">Citizen</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="passport">Passport Number</Label>
            <Input
              id="passport"
              placeholder="Passport number"
              value={profile.passport_number || ''}
              onChange={(e) => setProfile({ ...profile, passport_number: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="passport-expiry">Passport Expiry Date</Label>
            <Input
              id="passport-expiry"
              type="date"
              value={profile.passport_expiry || ''}
              onChange={(e) => setProfile({ ...profile, passport_expiry: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Dietary Restrictions</Label>
            <div className="space-y-2">
              {['Vegetarian', 'Vegan', 'Halal', 'Kosher', 'Gluten-Free', 'Dairy-Free', 'Nut Allergy'].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={profile.dietary_restrictions?.includes(option)}
                    onChange={() => handleDietaryChange(option)}
                    className="rounded border-input"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergency-name">Emergency Contact Name</Label>
            <Input
              id="emergency-name"
              placeholder="Full name"
              value={profile.emergency_contact_name || ''}
              onChange={(e) => setProfile({ ...profile, emergency_contact_name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergency-phone">Emergency Contact Phone</Label>
            <Input
              id="emergency-phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={profile.emergency_contact_phone || ''}
              onChange={(e) => setProfile({ ...profile, emergency_contact_phone: e.target.value })}
            />
          </div>

          <Button onClick={handleSave} disabled={loading} className="w-full">
            {loading ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};