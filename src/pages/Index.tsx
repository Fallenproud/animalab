import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/landing/Hero";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handlePlaygroundClick = () => {
    navigate("/playground");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onPlaygroundClick={handlePlaygroundClick} />
      <main>
        <Hero onGetStarted={handlePlaygroundClick} />
      </main>
    </div>
  );
};

export default Index;
