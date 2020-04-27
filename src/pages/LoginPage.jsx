import React from "react";
import UserAvatar from "../features/auth/components/UserAvatar";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

import { Route, useHistory } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const history = useHistory();

  const handleTempLogin = React.useCallback(() => {
    dispatch(login());
  }, [dispatch]);

  React.useEffect(() => {
    if (user) {
      history.push(`/${user.name.split(" ")[0].toLowerCase()}/boards`);
    }
  }, [user, history]);

  return (
    <div>
      <UserAvatar onTempLogin={handleTempLogin} />
    </div>
  );
};

export default LoginPage;
