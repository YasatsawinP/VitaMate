"use client";

import { useState, useEffect } from "react";
import { loadProfile } from "@/lib/health/profileStorage";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import DashboardClient from "@/components/dashboard/DashboardClient";
import type { UserProfile } from "@/lib/types/profile";

export default function AppShell() {
  // "loading" prevents a flash of onboarding before localStorage is read
  const [profile, setProfile] = useState<UserProfile | null | "loading">("loading");

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  if (profile === "loading") {
    return (
      <div
        className="min-h-screen"
        style={{
          background:
            "radial-gradient(1100px 600px at 85% -10%, #E4ECDB 0%, transparent 60%), " +
            "radial-gradient(800px 500px at -5% 110%, rgba(233,200,180,0.18) 0%, transparent 65%), " +
            "#F4EFE3",
        }}
      />
    );
  }

  if (!profile) {
    return <OnboardingFlow onComplete={(p) => setProfile(p)} />;
  }

  return <DashboardClient profile={profile} />;
}
