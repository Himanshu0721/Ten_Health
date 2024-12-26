import { createContext, useState } from "react";

export const context = createContext();

export const HealthProvider = ({ children }) => {
  const [healthData, setHealthData] = useState({
    messages: { questions: [], answers: [] },
  });
  return (
    <context.Provider value={{ healthData, setHealthData }}>
      {children}
    </context.Provider>
  );
};
