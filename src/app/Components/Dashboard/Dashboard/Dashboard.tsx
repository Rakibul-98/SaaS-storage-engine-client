import { Badge } from "../../../../components/ui/badge";
import StatisticsCards from "./StatisticsCards";

export default function Dashboard() {
  const username = "Rakibul Hasan";
  const activePack = "Free";
  return (
    <div>
      <div className="flex justify-between items-center gap-5">
        <h3>
          Welcome back, <span>{username}</span>
        </h3>
        <Badge>{activePack}</Badge>
      </div>
      <StatisticsCards />
      <div>charts</div>
    </div>
  );
}
