import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Lock, Check } from "lucide-react";
import { toast } from "sonner";

export const RegisterTab = ({ onSuccess }: { onSuccess: () => void }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (!acceptTerms) {
      toast.error("Please accept the terms and privacy policy");
      return;
    }
    toast.success("Account created! Welcome aboard! ✨");
    onSuccess();
  };

  return (
    <form onSubmit={handleRegister} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium">
          Username
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="username"
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="pl-10 h-12 bg-background/50 border-border/50 focus:border-secondary rounded-xl"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-email" className="text-sm font-medium">
          Email or Phone
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="reg-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-12 bg-background/50 border-border/50 focus:border-secondary rounded-xl"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-password" className="text-sm font-medium">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="reg-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 h-12 bg-background/50 border-border/50 focus:border-secondary rounded-xl"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password" className="text-sm font-medium">
          Confirm Password
        </Label>
        <div className="relative">
          <Check className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-10 h-12 bg-background/50 border-border/50 focus:border-secondary rounded-xl"
          />
        </div>
      </div>

      <div className="flex items-start space-x-3 pt-2">
        <Checkbox
          id="terms"
          checked={acceptTerms}
          onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
          className="mt-1"
        />
        <label
          htmlFor="terms"
          className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
        >
          I accept the{" "}
          <button type="button" className="text-secondary hover:text-secondary/80">
            Terms & Conditions
          </button>{" "}
          and{" "}
          <button type="button" className="text-secondary hover:text-secondary/80">
            Privacy Policy
          </button>
        </label>
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-secondary to-accent hover:shadow-lg hover:scale-105 transition-all"
      >
        Create Account
      </Button>
    </form>
  );
};
