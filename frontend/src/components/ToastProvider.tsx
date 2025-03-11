"use client";
import * as Toast from "@radix-ui/react-toast";
import React, { createContext, useContext, useState } from "react";

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastContext = createContext<(message: string) => void>(() => {});

export function ToastProvider({ children }: ToastProviderProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = (text: string) => {
    setMessage(text);
    setOpen(true);
  };

  return (
    <ToastContext.Provider value={showToast}>
      <Toast.Provider swipeDirection="right">
        {children}
        <Toast.Root open={open} onOpenChange={setOpen} className="bg-gray-800 text-white p-2 rounded">
          <Toast.Title>{message}</Toast.Title>
          <Toast.Action altText="Close" asChild>
            <button className="ml-2 text-blue-400">Close</button>
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-4 right-4 w-64" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
