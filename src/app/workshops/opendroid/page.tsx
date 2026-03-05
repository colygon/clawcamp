import { workshops } from "@/data/workshops";
import WorkshopPage from "@/components/WorkshopPage";

export default function OpenDroidWorkshop() {
  const workshop = workshops.find((w) => w.slug === "opendroid")!;
  return <WorkshopPage workshop={workshop} />;
}
