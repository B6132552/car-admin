/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthProviderContext = createContext<any>({});

const AuthProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const _redirect = () => {
      if (pathname === "/") {
        navigate("/usermanagement", { replace: true});
      }
    };
    _redirect();
  }, [pathname]);

  // if (isLoading && !isRefetching) {
  //   return LoadingPage
  // }

  return (
    <AuthProviderContext.Provider value={{}}>
      {children}
    </AuthProviderContext.Provider>
  );
};
export const useAuth = () => useContext(AuthProviderContext);
export default AuthProvider;
