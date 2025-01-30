import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Routing/Layout";
import { ToastifyComponent } from "./components/ToastifyComponent/ToastifyComponent";
import {
  publicRoutes,
  protectedCustomerRoutes,
  doctorAdminRoutes,
  hospitalAdminRoutes,
  labAdminRoutes,
  superAdminRoutes,
} from "./routes";
import { ShowFeedBackPopupContext } from "./components/ShowFeedBackPopup/ShowFeedBackPopupContext";
import { ShowFeedBackPopup } from "./components/ShowFeedBackPopup/ShowFeedBackPopup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import RequireAuth from "./components/Routing/Auth/RequireAuth";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <>
      <ToastifyComponent />
      <BrowserRouter>
        <ShowFeedBackPopupContext>
          <ShowFeedBackPopup />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* //Public Routes---------------------- */}
                {publicRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))}
                {/* //protected Customer Routes---------------------- */}
                <Route element={<RequireAuth allowedRoles={["customer"]} />}>
                  {protectedCustomerRoutes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Route>
                {/* //protected doctor admin routes */}
                <Route element={<RequireAuth allowedRoles={["doctor"]} />}>
                  {doctorAdminRoutes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Route>
                {/* //protected hospitaladmin routes */}
                <Route element={<RequireAuth allowedRoles={["hospital"]} />}>
                  {hospitalAdminRoutes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Route>
                {/* //protected labadmin routes */}
                <Route element={<RequireAuth allowedRoles={["lab"]} />}>
                  {labAdminRoutes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Route>
                {/* //protected super admin routes */}
                {/* <Route element={<RequireAuth allowedRoles={["customer"]} />}> */}
                <Route >
                  {superAdminRoutes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Route>
                <Route element={<NotFoundPage />} />
              </Route>
            </Routes>
          </LocalizationProvider>
        </ShowFeedBackPopupContext>
      </BrowserRouter>
    </>
  );
}

export default App;
