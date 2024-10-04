import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Contexts from "./contexts/Contexts";
import SearchDoctorProvider from "./contexts/Doctor/SearchDoctorProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthProvider from "./contexts/Auth/AuthProvider";
import TabBarProvider from "./contexts/MobileScreen/TabBarProvider";
import PharmacyProvider from "./contexts/PharmacyContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <GoogleOAuthProvider clientId="953927151453-fk1lv5f5gk7c72ll8npeekj0qi60430h.apps.googleusercontent.com">
        <React.StrictMode>
          <Contexts>
            <SearchDoctorProvider>
              <PharmacyProvider>
                <TabBarProvider>
                  <App />
                </TabBarProvider>
              </PharmacyProvider>
            </SearchDoctorProvider>
          </Contexts>
        </React.StrictMode>
      </GoogleOAuthProvider>
    </AuthProvider>
    <ReactQueryDevtools initialIsOpen={true} position="bottom" />
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
