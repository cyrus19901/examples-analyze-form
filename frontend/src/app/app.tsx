"use client";

import React, { useState, useEffect } from "react";
import AnalysisGraph from "../components/AnalysisGraph";

const mockKeyAssumptions = {
  units: 425,
  effectiveRentPerUnit: 158,
  generalVacancy: 0.1,
  operatingExpenseRatio: 0.2578,
};

const mockProformaMetrics = [
  {
    period: "Untrended",
    effectiveGrossRevenue: 831696,
    operatingExpenses: 201931,
    netOperatingIncome: 581496,
    capitalExpenditures: 16900,
    cashFlowFromOperations: 564596,
    capRate: 0.065,
    propertyValue: 8946088,
  },
  {
    period: "Trended",
    effectiveGrossRevenue: 831696,
    operatingExpenses: 209617,
    netOperatingIncome: 597855,
    capitalExpenditures: 17581,
    cashFlowFromOperations: 580274,
    capRate: 0.065,
    propertyValue: 9197771,
  },
  {
    period: "Sale",
    effectiveGrossRevenue: 831696,
    operatingExpenses: 215905,
    netOperatingIncome: 615791,
    capitalExpenditures: 18109,
    cashFlowFromOperations: 597682,
    capRate: 0.065,
    propertyValue: 9473704,
  },
];

const App = () => {
  const [proformaMetrics, setProformaMetrics] = useState<any[]>([]);
  const [keyAssumptions, setKeyAssumptions] = useState<any>({});

  useEffect(() => {
    setTimeout(() => {
      console.log("Mock data loaded");
      setProformaMetrics(mockProformaMetrics);
      setKeyAssumptions(mockKeyAssumptions);
    }, 1000);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-[calc(100%-200px)] mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Proforma Analysis Report
        </h1>

        {proformaMetrics.length > 0 && keyAssumptions ? (
          <AnalysisGraph proformaMetrics={proformaMetrics} keyAssumptions={keyAssumptions} />
        ) : (
          <p className="text-gray-500 text-center">Loading mock data...</p>
        )}
      </div>
    </div>
  );
};

export default App;
