import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { dashboard } from "../utils/getPath";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const history = useHistory();

  const handleTempLogin = React.useCallback(() => {
    dispatch(login());
  }, [dispatch]);

  React.useEffect(() => {
    if (user) {
      history.replace(dashboard(user));
    }
  }, [user, history]);

  return (
    <div>
      <button onClick={handleTempLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
