import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ Component, ...rest }) {
  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
