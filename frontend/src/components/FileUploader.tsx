"use client";

import React, { useState } from "react";
import { useToast } from "./ToastProvider";

export function FileUploader({ onImageProcessed }: { onImageProcessed: (image: any) => void }) {
  const [loading, setLoading] = useState(false);
  const showToast = useToast();

  const handleFileUpload = async () => {
    setLoading(true);
    try {
      const fileUrl = "https://i.imgur.com/9CYdOda.png"; // ✅ External image URL

      console.log("Sending file URL:", fileUrl);
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: fileUrl }),
      });

      console.log("Server Response:", response);
      if (!response.ok) throw new Error("Failed to process image");

      const { analysis } = await response.json();
      onImageProcessed(analysis);
      showToast("File processed successfully!");
    } catch (error) {
      showToast("Error processing file. Check console for details.");
      console.error("Image Processing Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleFileUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 w-full text-center"
      >
        Process External Image
      </button>
      {loading && <p className="text-blue-600 mt-2">Processing...</p>}
    </div>
  );
}
