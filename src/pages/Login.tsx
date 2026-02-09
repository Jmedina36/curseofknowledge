import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI-only: navigate to main app
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-yellow-500/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-red-500/5 blur-[100px]" />
      </div>

      <div className="w-full max-w-md mx-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-8 start-day-entrance">
          <h1 className="font-fantasy-decorative text-3xl sm:text-4xl tracking-[0.15em] bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
            CURSE OF KNOWLEDGE
          </h1>
          <p className="font-fantasy text-sm tracking-widest text-muted-foreground subtitle-fade">
            {isSignUp ? "BEGIN YOUR QUEST" : "CONTINUE YOUR QUEST"}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-lg border border-yellow-500/20 bg-card/80 backdrop-blur-sm shadow-[0_0_30px_rgba(234,179,8,0.08)] p-8">
          {/* Decorative top border */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent mb-6" />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-fantasy text-xs tracking-wider text-yellow-200/70">
                EMAIL
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="scholar@arcane.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-secondary/50 border-yellow-500/10 focus:border-yellow-500/40 placeholder:text-muted-foreground/50 font-fantasy text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-fantasy text-xs tracking-wider text-yellow-200/70">
                PASSWORD
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-secondary/50 border-yellow-500/10 focus:border-yellow-500/40 placeholder:text-muted-foreground/50 font-fantasy text-sm"
              />
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="font-fantasy text-xs tracking-wider text-yellow-200/70">
                  CONFIRM PASSWORD
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-secondary/50 border-yellow-500/10 focus:border-yellow-500/40 placeholder:text-muted-foreground/50 font-fantasy text-sm"
                />
              </div>
            )}

            {!isSignUp && (
              <div className="text-right">
                <button
                  type="button"
                  className="font-fantasy text-xs text-yellow-500/60 hover:text-yellow-400 transition-colors tracking-wider"
                >
                  FORGOT PASSWORD?
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full font-fantasy tracking-widest text-sm bg-gradient-to-r from-yellow-700/80 via-yellow-600/80 to-yellow-700/80 hover:from-yellow-600/90 hover:via-yellow-500/90 hover:to-yellow-600/90 text-yellow-100 border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.15)] transition-all duration-300 h-11"
            >
              {isSignUp ? "CREATE ACCOUNT" : "ENTER THE REALM"}
            </Button>
          </form>

          {/* Decorative bottom border */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent mt-6 mb-4" />

          {/* Toggle sign up / sign in */}
          <p className="text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "New to the realm?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-fantasy text-yellow-400/80 hover:text-yellow-300 transition-colors tracking-wider"
            >
              {isSignUp ? "SIGN IN" : "SIGN UP"}
            </button>
          </p>
        </div>

        {/* Bottom sigil */}
        <div className="flex justify-center mt-6">
          <svg width="40" height="40" viewBox="0 0 40 40" className="text-yellow-500/20">
            <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <line x1="20" y1="2" x2="20" y2="38" stroke="currentColor" strokeWidth="0.5" />
            <line x1="2" y1="20" x2="38" y2="20" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Login;
