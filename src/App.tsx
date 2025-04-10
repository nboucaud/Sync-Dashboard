import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { PATHS } from "./utils/paths";
import Signup from "./modules/Auth/Signup";
import Login from "./modules/Auth/Login";
import { ToastContainer } from "react-toastify";
import { ProtectPrivateLayout } from "./components";
import Dashboard from "./modules/Dashboard";
import { NotFoundRoute } from "./components/NotFoundRoute";
import { PrivateLayout } from "./layouts/PrivateLayout";
import Settings from "./modules/Settings";
import Onboarding from "./modules/Onboarding";
import { Waitlist } from "./modules/Auth/Waitlist";
import { Confirmation } from "./modules/Auth/Confirmation";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to={PATHS.Dashboard} />} />
          <Route path={PATHS.Login} element={<Login />} />
          <Route path={PATHS.Signup} element={<Signup />} />
          <Route path={PATHS.Onboarding} element={<Onboarding />} />
          <Route path={PATHS.Waitlist} element={<Waitlist />} />
          <Route path={PATHS.Validation} element={<Confirmation />} />
          <Route
            path={PATHS.Dashboard}
            element={
              <ProtectPrivateLayout>
                <PrivateLayout />
              </ProtectPrivateLayout>
            }
          >
            <Route index element={<Dashboard />} />

            <Route path={PATHS.Settings} element={<Settings />} />
          </Route>

          <Route path="*" element={<NotFoundRoute />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
