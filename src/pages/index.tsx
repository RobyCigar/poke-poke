import React, { useState, useEffect } from "react";
import LandingLayout from "../layout/LandingLayout";
import Hero from "@/components/hero";
import EventOverview from "@/components/event-overview";
import RaceCategories from "@/components/race-categories";
import { SponsorsSection } from "../components/sponsors-section";

function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <EventOverview />
      <RaceCategories />
      <SponsorsSection/>
    </main>
  );
}


export default Home;
