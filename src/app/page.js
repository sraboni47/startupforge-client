import LatestOpenings from "./opportunities/LatestOpenings";

import Banner from "./home/Banner";
import WhyStartupForge from "@/components/shared/WhyStartupForge";
import StatsSection from "./home/StatsSection";
import FeaturedStartups from "./home/FeaturedStartups";
import SuccessStories from "@/components/shared/SuccessStories";
import ReadyToForge from "@/components/shared/ReadyToForge";

export default function HomePage() {
  return (
    <>
      <Banner />

      <StatsSection />

      <FeaturedStartups />

      <LatestOpenings />
      <WhyStartupForge />
      <SuccessStories />
      <ReadyToForge />
    </>
  );
}
