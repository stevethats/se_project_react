import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthorizationContext from "../contexts/CurrentUserContext";

function ProtectedRoute({ children, anonymous = false }) {
  const location = useLocation();
  const from = location.state?.from || "/";

  const { isLoggedIn } = useContext(AuthorizationContext);

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to={"/"} state={{ location }} />;
  }

  return children;
}

export default ProtectedRoute;
