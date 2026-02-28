import { Progress } from "../../../../components/ui/progress";

export default function StatisticsCards() {
  const userStatistics = [
    {
      id: 1,
      title: "Files",
      used: 24,
      max: 100,
    },
    {
      id: 2,
      title: "Folders",
      used: 7,
      max: 10,
    },
    {
      id: 3,
      title: "Storage",
      used: 24.5,
      max: 10,
    },
    {
      id: 4,
      title: "Files",
      used: 24,
      max: 100,
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-5">
      {userStatistics.map((s, i) => (
        <div key={i} className="bg-primary/10 p-3 rounded-md">
          <p>{s.title} Used</p>
          <h3>
            <span>{s.used}</span>/{s.max}
          </h3>
          <Progress value={s.used} max={s.max} />
        </div>
      ))}
    </div>
  );
}
