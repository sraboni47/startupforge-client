"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const storedApplications = localStorage.getItem("applications");

    if (storedApplications) {
      setApplications(JSON.parse(storedApplications));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  const addApplication = (application) => {
    const newApplication = {
      id: Date.now(),
      applied: new Date().toISOString().split("T")[0],
      status: "Pending",
      ...application,
    };

    setApplications((prev) => [...prev, newApplication]);
  };

  const deleteApplication = (id) => {
    setApplications((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        addApplication,
        deleteApplication,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => useContext(ApplicationContext);
