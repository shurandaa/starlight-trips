import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";
import { toast } from "sonner";

export const LoginTab = ({ onSuccess }: { onSuccess: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      toast.success("Welcome back! 🌸");
      onSuccess();
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email or Phone
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary rounded-xl"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary rounded-xl"
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button
          type="button"
          className="text-sm text-primary hover:text-primary-glow transition-colors"
        >
          Forgot Password?
        </button>
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:scale-105 transition-all"
      >
        Login
      </Button>
    </form>
  );
};
