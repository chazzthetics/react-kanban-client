import React from "react";
import { Avatar } from "@chakra-ui/core";
import { useSelector } from "react-redux";

const UserAvatar = ({ ...rest }) => {
  const { user } = useSelector(state => state.auth);

  return (
    <Avatar
      bg="gray.300"
      size="sm"
      color="black"
      cursor="pointer"
      name={user && user.name}
      {...rest}
    />
  );
};

export default UserAvatar;
