import ProfitChart, { DataPoint } from "@/components/charts/ProfitChart";
import { format, subDays } from "date-fns";
import dynamic from "next/dynamic";

const DataGrid = dynamic(
  () => {
    return import("../components/data-grid/DataGrid");
  },
  { ssr: false }
);

export default function Home() {
  const generateMockData = (): DataPoint[] => {
    const data: DataPoint[] = [];
    const today = new Date();
    let value = 0; // Start value for the chart

    for (let i = 365; i >= 0; i--) {
      const date = subDays(today, i);
      // Simulate a slight upward trend with some random noise
      const dailyChange = Math.random() * 2 - 1; // Random daily change between -1 and +1
      value += dailyChange;
      data.push({
        x: format(date, "yyyy-MM-dd"), // Date in 'yyyy-MM-dd' format
        y: parseFloat(value.toFixed(2)), // Simulated value with 2 decimal places
      });
    }
    return data;
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-24">
      <div className="w-full">
        <ProfitChart rawData={generateMockData()} />
      </div>
      <div>
        <DataGrid />
      </div>
    </main>
  );
}
