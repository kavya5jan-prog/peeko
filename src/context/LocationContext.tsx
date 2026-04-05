import React, { createContext, useContext, useState, ReactNode } from "react";

interface LocationContextType {
  addressLine1: string;
  addressLine2: string;
  setAddress: (line1: string, line2: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  // Using the Bengaluru address from LocationScreen.tsx as default
  const [addressLine1, setAddressLine1] = useState("26, 10th Cross Rd");
  const [addressLine2, setAddressLine2] = useState("HAL 3rd Stage, Bengaluru, Karnataka 560008, India");

  const setAddress = (line1: string, line2: string) => {
    setAddressLine1(line1);
    setAddressLine2(line2);
  };

  return (
    <LocationContext.Provider value={{ addressLine1, addressLine2, setAddress }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
