import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./ui/AppLayout";
import Home from "./page/Home";
import Chat from "./page/Chat";
import User from "./page/User";
import Signin from "./page/Signin";
import Signup from "./page/Signup";
import PageNotFound from "./page/PageNotFound";
import ProtectRoute from "./ui/ProtectRoute";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60, // 1 minute
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition="bottom-left"
        position="bottom"
      />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectRoute>
                <AppLayout />
              </ProtectRoute>
            }
          >
            <Route index element={<Navigate replace to="/feed" />} />
            <Route path="/feed" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/user" element={<User />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        containerStyle={{ margin: "8px" }}
        gutter={12}
        position="top-center"
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#374151",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
