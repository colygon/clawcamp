import { workshops } from "@/data/workshops";
import WorkshopPage from "@/components/WorkshopPage";

export default function UnitreeG1Workshop() {
  const workshop = workshops.find((w) => w.slug === "unitree-g1")!;
  return <WorkshopPage workshop={workshop} />;
}
