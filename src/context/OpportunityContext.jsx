"use client";

import { createContext, useContext, useState } from "react";
import defaultOpportunities from "@/data/opportunities";

const OpportunityContext = createContext();

export const OpportunityProvider = ({ children }) => {
  const [opportunities, setOpportunities] = useState(defaultOpportunities);

 const addOpportunity = (opportunity) => {
  setOpportunities((prev) => [
    ...prev,
    {
      id: Date.now(),
      createdAt: new Date().toISOString().split("T")[0],
      ...opportunity,
    },
  ]);
};

  const deleteOpportunity = (id) => {
    setOpportunities((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <OpportunityContext.Provider
      value={{
        opportunities,
        addOpportunity,
        deleteOpportunity,
      }}
    >
      {children}
    </OpportunityContext.Provider>
  );
};

export const useOpportunity = () => {
  return useContext(OpportunityContext);
};