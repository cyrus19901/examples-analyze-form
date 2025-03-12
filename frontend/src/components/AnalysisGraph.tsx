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

interface FinancialMetrics {
  arr: number;
  revenue: number;
  costOfRevenue: { support: number; hostingAndDelivery: number; total: number };
  grossProfit?: { amount: number; margin: number } | null;
  expenses: { engineering: number; generalAndAdmin: number; salesAndMarketing: number; total: number };
  netIncome: number;
  cashFlow: { operating: number; investing: number; financing: number; netChange: number };
  bankBalance: number;
}

interface MonthlyComparison {
  month: string;
  target?: FinancialMetrics | null;
  actual: FinancialMetrics;
  deltas: { arr: number; revenue: number; netIncome: number; bankBalance: number };
}

interface AnalysisGraphProps {
  formulas: any[];
  keyAssumptions: Record<string, number>;
  metricType: string;
  monthlyMetrics: MonthlyComparison[];
  proformaMetrics: any[];
}

const AnalysisGraph: React.FC<AnalysisGraphProps> = ({
  formulas,
  keyAssumptions,
  metricType,
  monthlyMetrics,
  proformaMetrics,
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* 📋 Metric Type */}
      <div className="w-full max-w-4xl bg-white shadow-md p-6 rounded-lg mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Metric Type: {metricType}
        </h2>
      </div>

      {/* 📋 Monthly Financial Metrics Table */}
      {monthlyMetrics && monthlyMetrics.length > 0 && (
        <div className="w-full max-w-5xl bg-white shadow-md p-6 rounded-lg mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
            Monthly Financial Summary
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg shadow-md text-center">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3">Month</th>
                  <th className="p-3">ARR</th>
                  <th className="p-3">Revenue</th>
                  <th className="p-3">Net Income</th>
                  <th className="p-3">Bank Balance</th>
                </tr>
              </thead>
              <tbody>
                {monthlyMetrics.map((data, index) => (
                  <tr key={index} className="border-t border-gray-200 hover:bg-gray-100 transition">
                    <td className="p-3">{data.month}</td>
                    <td className="p-3">${data.actual.arr.toLocaleString()}</td>
                    <td className="p-3">${data.actual.revenue.toLocaleString()}</td>
                    <td className={`p-3 ${data.actual.netIncome < 0 ? "text-red-500" : "text-green-600"}`}>
                      ${data.actual.netIncome.toLocaleString()}
                    </td>
                    <td className="p-3">${data.actual.bankBalance.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 📊 Monthly Revenue vs ARR Comparison */}
      {monthlyMetrics && (
        <div className="w-full max-w-4xl bg-white shadow-md p-6 rounded-lg mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
            Monthly ARR vs Revenue
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actual.arr" stroke="#0088FE" strokeWidth={2} name="ARR" />
              <Line type="monotone" dataKey="actual.revenue" stroke="#00C49F" strokeWidth={2} name="Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 📊 Expenses Breakdown */}
      {monthlyMetrics && (
        <div className="w-full max-w-4xl bg-white shadow-md p-6 rounded-lg mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
            Monthly Expenses Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="actual.expenses.engineering" fill="#8884d8" name="Engineering" />
              <Bar dataKey="actual.expenses.generalAndAdmin" fill="#82ca9d" name="General & Admin" />
              <Bar dataKey="actual.expenses.salesAndMarketing" fill="#FFBB28" name="Sales & Marketing" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
     <div className="w-full max-w-4xl bg-white shadow-md p-6 rounded-lg mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Monthly Performance Changes (Deltas)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg shadow-md text-center">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3">Month</th>
                <th className="p-3">ARR Change</th>
                <th className="p-3">Revenue Change</th>
                <th className="p-3">Net Income Change</th>
                <th className="p-3">Bank Balance Change</th>
              </tr>
            </thead>
            <tbody>
              {monthlyMetrics.map((data, index) => (
                <tr key={index} className="border-t border-gray-200 hover:bg-gray-100 transition">
                  <td className="p-3">{data.month}</td>
                  <td className="p-3">{data.deltas.arr.toLocaleString()}</td>
                  <td className="p-3">{data.deltas.revenue.toLocaleString()}</td>
                  <td className={`p-3 ${data.deltas.netIncome < 0 ? "text-red-500" : "text-green-600"}`}>
                    {data.deltas.netIncome.toLocaleString()}
                  </td>
                  <td className="p-3">{data.deltas.bankBalance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
      {/* 🥧 Pie Chart for Cost of Revenue */}
      {monthlyMetrics && (
        <div className="w-full max-w-sm bg-white shadow-md p-6 rounded-lg mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
            Cost of Revenue Distribution
          </h2>
          <ResponsiveContainer width={400} height={300}>
            <PieChart>
              <Pie
                data={monthlyMetrics.map((item) => ({
                  name: item.month,
                  value: item.actual.costOfRevenue.total,
                }))}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {monthlyMetrics.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
           <div className="w-full max-w-4xl bg-white shadow-md p-6 rounded-lg mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Key Assumptions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg shadow-md text-center">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3">Parameter</th>
                <th className="p-3">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(keyAssumptions).map(([key, value]) => (
                <tr key={key} className="border-t border-gray-200 hover:bg-gray-100 transition">
                  <td className="p-3">{key}</td>
                  <td className="p-3">{value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

        <div className="w-full max-w-4xl bg-white shadow-md p-6 rounded-lg mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Formulas Used
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg shadow-md text-center">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3">Formula Name</th>
                <th className="p-3">Expression</th>
                <th className="p-3">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {formulas.map((formula, index) => (
                <tr key={index} className="border-t border-gray-200 hover:bg-gray-100 transition">
                  <td className="p-3">{formula.name}</td>
                  <td className="p-3">{formula.expression}</td>
                  <td className="p-3">{formula.purpose}</td>
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
