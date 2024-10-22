import React, { createContext, useState, useContext } from 'react';

// Create the context
const LoginModalContext = createContext();

// Create a provider component
export const LoginModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showLoginModal = () => setIsModalOpen(true);
  const hideLoginModal = () => setIsModalOpen(false);

  return (
    <LoginModalContext.Provider value={{ isModalOpen, showLoginModal, hideLoginModal }}>
      {children}
    </LoginModalContext.Provider>
  );
};

// Custom hook to use the context
export const useLoginModal = () => useContext(LoginModalContext);
