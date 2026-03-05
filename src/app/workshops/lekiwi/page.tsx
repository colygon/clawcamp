import { workshops } from "@/data/workshops";
import WorkshopPage from "@/components/WorkshopPage";

export default function LeKiwiWorkshop() {
  const workshop = workshops.find((w) => w.slug === "lekiwi")!;
  return <WorkshopPage workshop={workshop} />;
}
