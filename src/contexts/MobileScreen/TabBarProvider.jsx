import { useState, createContext, useContext } from "react";

export const TabBarContext = createContext();

const TabBarProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(
    () => sessionStorage.getItem("activeTab") || "home"
  );

  const handleUpdateActiveTab = (page) => {
    setActiveTab(page.toLowerCase());
    sessionStorage.setItem("activeTab", page);
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
