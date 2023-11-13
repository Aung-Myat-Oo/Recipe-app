import React, { createContext, useState } from "react";

export const MealContext = createContext();

const MealProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <MealContext.Provider value={{ isActive, setIsActive }}>
      {children}
    </MealContext.Provider>
  );
};

export default MealProvider;
