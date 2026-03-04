import { workshops } from "@/data/workshops";
import WorkshopPage from "@/components/WorkshopPage";

export default function PersonalAssistantWorkshop() {
  const workshop = workshops.find((w) => w.slug === "personal-assistant")!;
  return <WorkshopPage workshop={workshop} />;
}
