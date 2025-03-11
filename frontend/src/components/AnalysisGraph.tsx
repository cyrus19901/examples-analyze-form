"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface KeyAssumptions {
  units: number;
  effectiveRentPerUnit: number;
  generalVacancy: number;
  operatingExpenseRatio: number;
}

interface ProformaMetrics {
  period: string;
  effectiveGrossRevenue: number;
  operatingExpenses: number;
  netOperatingIncome: number;
  capRate: number;
  propertyValue: number;
}

interface AnalysisGraphProps {
  proformaMetrics: ProformaMetrics[];
  keyAssumptions: KeyAssumptions;
}

const AnalysisGraph: React.FC<AnalysisGraphProps> = ({ proformaMetrics }) => {
  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* 📊 Line Chart */}
      <div className="w-full max-w-4xl bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Proforma Trends
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={proformaMetrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="netOperatingIncome" stroke="#8884d8" strokeWidth={2} name="NOI" />
            <Line type="monotone" dataKey="cashFlowFromOperations" stroke="#82ca9d" strokeWidth={2} name="Cash Flow" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 📊 Bar Chart */}
      <div className="w-full max-w-4xl bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Financial Breakdown
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={proformaMetrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="netOperatingIncome" fill="#8884d8" name="NOI" />
            <Bar dataKey="cashFlowFromOperations" fill="#82ca9d" name="Cash Flow" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🥧 Pie Chart */}
      <div className="w-full max-w-sm bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Revenue Distribution
        </h2>
        <ResponsiveContainer width={400} height={300}>
          <PieChart>
            <Pie
              data={proformaMetrics.map((item) => ({
                name: item.period,
                value: item.effectiveGrossRevenue,
              }))}
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {proformaMetrics.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Validation Table */}
      <div className="w-full max-w-4xl bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Validation Check
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 text-left">Period</th>
                <th className="p-3 text-left">NOI</th>
                <th className="p-3 text-left">Cash Flow</th>
                <th className="p-3 text-left">Cap Rate</th>
                <th className="p-3 text-left">Property Value</th>
              </tr>
            </thead>
            <tbody>
              {proformaMetrics.map((data, index) => (
                <tr key={index} className="border-t border-gray-200 hover:bg-gray-100 transition">
                  <td className="p-3">{data.period}</td>
                  <td className="p-3">${data.netOperatingIncome.toLocaleString()}</td>
                  <td className="p-3">${data.cashFlowFromOperations.toLocaleString()}</td>
                  <td className="p-3">{(data.capRate * 100).toFixed(2)}%</td>
                  <td className="p-3">${data.propertyValue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalysisGraph;
