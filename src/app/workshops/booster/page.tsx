import { workshops } from "@/data/workshops";
import WorkshopPage from "@/components/WorkshopPage";

export default function BoosterWorkshop() {
  const workshop = workshops.find((w) => w.slug === "booster")!;
  return <WorkshopPage workshop={workshop} />;
}
