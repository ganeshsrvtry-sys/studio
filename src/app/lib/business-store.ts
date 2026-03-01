'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BusinessData {
  salesFigures: string;
  inventoryLevels: string;
  profitMargin: string;
  customerSatisfaction: string;
  inventoryTurnover: string;
  averageCustomerSpend: string;
  lastUpdated: string;
}

interface BusinessState {
  data: BusinessData;
  updateData: (newData: Partial<BusinessData>) => void;
}

const initialData: BusinessData = {
  salesFigures: "Monthly sales: $45,000. Top categories: Fresh Produce ($15k), Dairy ($10k), Dry Goods ($12k). Sales grow 5% month-over-month.",
  inventoryLevels: "Total inventory value: $28,000. High stock in: Beverages, Grains. Low stock in: Organic Apples, Fresh Milk. Spoilage rate: 4.2%.",
  profitMargin: "18%",
  customerSatisfaction: "88%",
  inventoryTurnover: "14 times/year",
  averageCustomerSpend: "$38.50",
  lastUpdated: new Date().toISOString(),
};

// Simplified create store for demo purposes (using standard react state if zustand not available, but usually we prefer a clear structure)
// Since I don't have zustand in package.json, I will implement a simpler context provider instead.
