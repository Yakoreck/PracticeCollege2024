import React, { FC, PropsWithChildren, useEffect } from "react";
import { Route, RouteProps, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  role: "user" | "admin";
}

const PrivateRoute: FC<PropsWithChildren<PrivateRouteProps>> = ({
  role,
  children,
}) => {
  const { user } = useAuth();
  console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || (user.role != role && user.role != "admin")) {
      navigate("/");
    }
  }, []);

  if (!user || (user.role != role && user.role != "admin")) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
