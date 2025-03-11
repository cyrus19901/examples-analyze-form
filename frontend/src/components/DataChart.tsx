"use client";
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface DataChartProps {
  data: Record<string, any[]>; // Multiple sheets
}

export function DataChart({ data }: DataChartProps) {
  const sheetNames = Object.keys(data);
  const [selectedSheet, setSelectedSheet] = useState(sheetNames[0] || "");

  if (!sheetNames.length) {
    return <p className="text-gray-500">No data available.</p>;
  }

  const chartData = data[selectedSheet] || [];

  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-md w-full">
      <label className="block mb-2 font-semibold">Select Sheet:</label>
      <select
        className="p-2 border rounded-md mb-4"
        value={selectedSheet}
        onChange={(e) => setSelectedSheet(e.target.value)}
      >
        {sheetNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          {/* <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(chartData[0] || {}).filter((key) => key !== "x").map((key, index) => (
            <Line key={index} type="monotone" dataKey={key} stroke={`#${Math.random().toString(16).substr(-6)}`} strokeWidth={2} />
          ))} */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
