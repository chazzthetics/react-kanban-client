import React from "react";
import { Avatar } from "@chakra-ui/core";
import { useSelector } from "react-redux";

const UserAvatar = ({ onTempLogin }) => {
  const { user } = useSelector(state => state.auth);

  return (
    <Avatar
      bg="green.400"
      size="sm"
      color="#fff"
      cursor="pointer"
      name={user && user.name}
      onClick={onTempLogin}
    />
  );
};

export default UserAvatar;
