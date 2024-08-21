"use client";
import React, { useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { subDays, format } from "date-fns";

ChartJS.register(
  TimeScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

export interface DataPoint {
  x: string; // Date in 'yyyy-MM-dd' format
  y: number; // Profit percentage
}

const ProfitChart = ({ rawData }: { rawData: DataPoint[] }) => {
  const [timeRange, setTimeRange] = useState<string>("1y"); // Default time range is 1 year

  const chartRef = useRef<any>();

  const chartData = {
    datasets: [
      {
        label: "Profit (%)",
        data: rawData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Semi-transparent fill color
        fill: "start",
        tension: 0.1,
        pointRadius: 0, // Hide points by default
        pointHoverRadius: 5, // Show point on hover
        pointHoverBackgroundColor: "rgba(75, 192, 192, 1)", // Color of the point on hover
        showLine: true, // Ensure the line is drawn
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit:
            timeRange === "1y" ? "month" : timeRange === "6m" ? "day" : "day",
          tooltipFormat: "PP", // Show date in tooltip
        },
        min:
          timeRange === "1y"
            ? subDays(new Date(), 365)
            : timeRange === "6m"
            ? subDays(new Date(), 180)
            : subDays(new Date(), 7),
        max: new Date(),
      },
      y: {
        title: {
          display: true,
          text: "Profit (%)",
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        intersect: false,
        callbacks: {
          label: function (tooltipItem: any) {
            return `Profit: ${tooltipItem.raw.y.toFixed(2)}%`;
          },
        },
      },
      legend: {
        display: false, // Hide the legend if not needed
      },
    },
    hover: {
      mode: "nearest" as const,
      intersect: false,
    },
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <button
          className="p-2 border border-black"
          onClick={() => setTimeRange("1y")}
        >
          1 Year
        </button>
        <button
          className="p-2 border border-black"
          onClick={() => setTimeRange("6m")}
        >
          6 Months
        </button>
        <button
          className="p-2 border border-black"
          onClick={() => setTimeRange("1w")}
        >
          1 Week
        </button>
      </div>
      <Line data={chartData} options={options} ref={chartRef} />
    </div>
  );
};

export default ProfitChart;
