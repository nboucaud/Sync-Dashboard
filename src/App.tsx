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

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to={PATHS.Login} />} />
          <Route path={PATHS.Login} element={<Login />} />
          <Route path={PATHS.Signup} element={<Signup />} />
          <Route path={PATHS.Dashboard} element={<PrivateLayout />}>
            <Route
              index
              element={
                <ProtectPrivateLayout>
                  <Dashboard />
                </ProtectPrivateLayout>
              }
            />

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
