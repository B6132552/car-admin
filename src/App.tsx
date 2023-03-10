import "./assets/scss/app.scss";
import { BrowserRouter,useRoutes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";



import "antd/dist/reset.css";
import AuthProvider from "./auth";
import { routers } from "./routers/routers";
const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const routes = useRoutes(routers);
  return routes;
};

const AppWrapper = () => {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default AppWrapper;
