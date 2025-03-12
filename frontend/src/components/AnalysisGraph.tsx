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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4567", "#A020F0"];

interface Revenue {
  product: number;
  serviceAndOther: number;
  total: number;
}

interface Costs {
  productCosts: number;
  serviceCosts: number;
  totalCosts: number;
  researchAndDevelopment: number;
  salesAndMarketing: number;
  generalAndAdmin: number;
  impairmentAndRestructuring: number;
}

interface Profitability {
  grossMargin: number;
  operatingIncome: number;
  otherIncome: number;
  incomeTaxes: number;
  netIncome: number;
}

interface PerShare {
  basic: number;
  diluted: number;
}

interface FinancialYear {
  year: string;
  revenue: Revenue;
  costs: Costs;
  profitability: Profitability;
  perShare: PerShare;
  ebitda: number | null;
}

interface AnalysisGraphProps {
  financialData: FinancialYear[];
}

const AnalysisGraph: React.FC<AnalysisGraphProps> = ({ financialData }) => {
  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* 📊 Revenue Breakdown */}
      <div className="w-full max-w-5xl bg-white shadow-md p-6 rounded-lg mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Revenue Breakdown (Product vs. Services)
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={financialData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue.product" fill="#0088FE" name="Product Revenue" />
            <Bar dataKey="revenue.serviceAndOther" fill="#00C49F" name="Service & Other Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📊 Profitability Analysis */}
      <div className="w-full max-w-5xl bg-white shadow-md p-6 rounded-lg mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Profitability Analysis (Net Income, Operating Income, Gross Margin)
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={financialData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="profitability.netIncome" stroke="#FF4567" strokeWidth={2} name="Net Income" />
            <Line type="monotone" dataKey="profitability.operatingIncome" stroke="#A020F0" strokeWidth={2} name="Operating Income" />
            <Line type="monotone" dataKey="profitability.grossMargin" stroke="#FFBB28" strokeWidth={2} name="Gross Margin" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 📊 Cost Breakdown */}
      <div className="w-full max-w-5xl bg-white shadow-md p-6 rounded-lg mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Cost Breakdown (Product Costs, R&D, Sales & Marketing)
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={financialData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="costs.productCosts" fill="#0088FE" name="Product Costs" />
            <Bar dataKey="costs.researchAndDevelopment" fill="#00C49F" name="R&D" />
            <Bar dataKey="costs.salesAndMarketing" fill="#FFBB28" name="Sales & Marketing" />
            <Bar dataKey="costs.generalAndAdmin" fill="#FF4567" name="G&A" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {financialData.some((item) => item.profitability.operatingIncome !== null) && (
        <div className="w-full max-w-sm bg-white shadow-md p-6 rounded-lg mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
            EBITDA Distribution
          </h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={financialData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="profitability.operatingIncome" stroke="#A020F0" strokeWidth={2} name="Operating Income" />
          </LineChart>
        </ResponsiveContainer>
        </div>
      )}

      {/* 📋 Earnings Per Share Table */}
      <div className="w-full max-w-4xl bg-white shadow-md p-6 rounded-lg mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Earnings Per Share (EPS)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg shadow-md text-center">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3">Year</th>
                <th className="p-3">EPS (Basic)</th>
                <th className="p-3">EPS (Diluted)</th>
              </tr>
            </thead>
            <tbody>
              {financialData?.map((data, index) => (
                <tr key={index} className="border-t border-gray-200 hover:bg-gray-100 transition">
                  <td className="p-3">{data.year}</td>
                  <td className="p-3">${data.perShare.basic.toFixed(2)}</td>
                  <td className="p-3">${data.perShare.diluted.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

//EBIDA  Calculation - (Operating income + Depreciation + Amortization)
export default AnalysisGraph;
