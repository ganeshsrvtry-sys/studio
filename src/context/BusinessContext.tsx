'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface BusinessData {
  salesFigures: string;
  inventoryLevels: string;
  profitMargin: string;
  customerSatisfaction: string;
  inventoryTurnover: string;
  averageCustomerSpend: string;
}

interface BusinessContextType {
  data: BusinessData;
  updateData: (newData: Partial<BusinessData>) => void;
}

const initialData: BusinessData = {
  salesFigures: "Monthly sales: $45,000. Top categories: Fresh Produce ($15k), Dairy ($10k), Dry Goods ($12k).",
  inventoryLevels: "Total inventory value: $28,000. High stock in: Beverages. Low stock in: Fresh Milk. Spoilage: 4%.",
  profitMargin: "18%",
  customerSatisfaction: "88%",
  inventoryTurnover: "14",
  averageCustomerSpend: "38.50",
};

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export function BusinessProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<BusinessData>(initialData);

  useEffect(() => {
    const saved = localStorage.getItem('shopsmart_data');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse business data", e);
      }
    }
  }, []);

  const updateData = (newData: Partial<BusinessData>) => {
    const updated = { ...data, ...newData };
    setData(updated);
    localStorage.setItem('shopsmart_data', JSON.stringify(updated));
  };

  return (
    <BusinessContext.Provider value={{ data, updateData }}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusinessData() {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error('useBusinessData must be used within a BusinessProvider');
  }
  return context;
}
