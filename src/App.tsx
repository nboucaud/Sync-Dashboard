import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { PATHS } from "./utils/paths";
import Signup from "./modules/Auth/Signup";
import Login from "./modules/Auth/Login";
import { ToastContainer } from "react-toastify";
import { ProtectPrivateLayout } from "./components";
import Dashboard from "./modules/Dashboard";
import { NotFoundRoute } from "./components/NotFoundRoute";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to={PATHS.Login} />} />
          <Route path={PATHS.Login} element={<Login />} />
          <Route path={PATHS.Signup} element={<Signup />} />
          <Route path={PATHS.Dashboard}>
            <Route
              index
              element={
                <ProtectPrivateLayout>
                  <Dashboard />
                </ProtectPrivateLayout>
              }
            />
          </Route>

          <Route path="*" element={<NotFoundRoute />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
