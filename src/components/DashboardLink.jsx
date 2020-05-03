import React from "react";
import PropTypes from "prop-types";
import { Link } from "@chakra-ui/core";

//FIXME:
const DashboardLink = ({ as, to, children, ...rest }) => {
  return (
    <Link
      as={as}
      d="block"
      to={to}
      fontWeight={700}
      bg={"inherit"}
      color="gray.600"
      w={"80%"}
      py={1}
      px={2}
      borderRadius={3}
      display="flex"
      alignItems="center"
      _hover={{ textDecor: "none" }}
      _active={{ backgroundColor: "blue.200", color: "blue.600" }}
      _focus={{ boxShadow: "none" }}
      transition="background-color 100ms ease-in"
      {...rest}
    >
      {children}
    </Link>
  );
};

export default DashboardLink;
