import { GameStateProvider } from "@/contexts/GameStateContext";
import AppShell from "@/components/layout/AppShell";

const Index = () => {
  return (
    <GameStateProvider>
      <AppShell />
    </GameStateProvider>
  );
};

export default Index;
