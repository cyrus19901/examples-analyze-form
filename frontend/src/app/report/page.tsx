"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { analyzeImage } from "../actions/reportAgent";
import AnalysisGraph from "../../components/AnalysisGraph";
import { Analysis } from "../../baml_client/types";

const ReportPage = () => {
  return (
    <Suspense fallback={<p className="text-center text-gray-500">Loading...</p>}>
      <ReportContent />
    </Suspense>
  );
};

// Wrapped logic inside a separate component to use `useSearchParams()`
const ReportContent = () => {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get("imageUrl");

  const [analysisData, setAnalysisData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isFetched = useRef(false); // ✅ Prevent multiple calls

  useEffect(() => {
    if (!imageUrl || isFetched.current) return;

    const fetchData = async () => {
      try {
        console.log("Fetching analysis for:", imageUrl);
        const response = await analyzeImage(imageUrl);
        console.log(response)
        setAnalysisData(response);
        console.log(analysisData)
      } catch (error) {
        console.error("Error fetching report:", error);
      } finally {
        setIsLoading(false);
        isFetched.current = true; 
      }
    };

    fetchData();
  }, [imageUrl]); // ✅ imageUrl is still a dependency, but will run only once

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-[calc(100%-200px)] mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Analysis Report
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-500">Processing Image...</p>
        ) : analysisData ? (
          <AnalysisGraph
            financialData={analysisData}
          />
        ) : (
          <p className="text-center text-gray-500">No data available</p>
        )}
      </div>
    </div>
  );
};

export default ReportPage;
