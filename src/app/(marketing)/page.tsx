import { HomeHero } from "@/components/home/HomeHero";
import { ClientVoices, JournalTeaser, SectorPanels, ServicesBand, StudioStatement } from "@/components/home/HomeSections";
import { EnquirySection, MethodSection } from "@/components/home/HomeSheets";
import { ProjectReel } from "@/components/home/ProjectReel";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <StudioStatement />
      <ServicesBand />
      <SectorPanels />
      <ProjectReel />
      <MethodSection />
      <ClientVoices />
      <JournalTeaser />
      <EnquirySection />
    </>
  );
}
