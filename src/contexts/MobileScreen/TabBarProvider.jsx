import { useState, createContext, useContext } from "react";

export const TabBarContext = createContext();

const TabBarProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("home");
 

  const handleUpdateActiveTab = (page) => {
    setActiveTab(page.toLowerCase());
  };

  return (
    <TabBarContext.Provider
      value={{
        activeTab,
        setActiveTab,
        handleUpdateActiveTab,
      }}
    >
      {children}
    </TabBarContext.Provider>
  );
};

export default TabBarProvider;

export const useTabBarContext = () => useContext(TabBarContext);
