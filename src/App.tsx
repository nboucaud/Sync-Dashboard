import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { PATHS } from "./utils/paths";
import Signup from "./modules/Auth/Signup";
import Login from "./modules/Auth/Login";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to={PATHS.Signup} />} />
          <Route path={PATHS.Login} element={<Login />} />
          <Route path={PATHS.Signup} element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
