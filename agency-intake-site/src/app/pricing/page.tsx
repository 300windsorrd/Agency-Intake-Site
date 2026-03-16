import type { Metadata } from "next";
import Pricing from "@/components/Pricing";
import StartProjectCTA from "@/components/StartProjectCTA";
import DiscountBanner from "@/components/DiscountBanner";
import { getDiscountBannerConfig } from "@/lib/discount";

export const metadata: Metadata = {
  title: "Pricing | BiteSites LLC",
  description:
    "Compare BiteSites LLC pricing for web development, social media management, and AI automation services.",
};

export default function PricingPage() {
  const discount = getDiscountBannerConfig();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#020617_0%,_#0f172a_30%,_#020617_100%)]">
      {discount.enabled && <DiscountBanner config={discount} />}
      <Pricing />
      <StartProjectCTA
        className="pt-0"
        title="Need a custom scope?"
        description="Tell us which service line you need, what timeline you are targeting, and where you expect the work to drive results. We will translate that into a practical next step."
        buttonLabel="Start Your Project"
      />
    </div>
  );
}
