import { useState } from "react";
import { LoginTab } from "./LoginTab";
import { RegisterTab } from "./RegisterTab";
import cityBg from "@/assets/city-bg.jpg";

export const AuthPage = ({ onAuthSuccess }: { onAuthSuccess: () => void }) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4">
      {/* Anime Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${cityBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-secondary/10" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-card rounded-3xl p-8 shadow-2xl glow animate-fade-in">
          {/* Header with tabs */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-center mb-6 text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Travel Planner AI
            </h1>
            
            <div className="flex gap-2 p-1 bg-muted/50 rounded-2xl">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === "login"
                    ? "bg-primary text-primary-foreground shadow-lg glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === "register"
                    ? "bg-secondary text-secondary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Tab Content with slide animation */}
          <div className="relative overflow-hidden">
            <div
              className={`transition-all duration-500 ease-out ${
                activeTab === "login" ? "translate-x-0" : "-translate-x-full opacity-0 absolute inset-0"
              }`}
            >
              <LoginTab onSuccess={onAuthSuccess} />
            </div>
            <div
              className={`transition-all duration-500 ease-out ${
                activeTab === "register" ? "translate-x-0" : "translate-x-full opacity-0 absolute inset-0"
              }`}
            >
              <RegisterTab onSuccess={onAuthSuccess} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
