import React from "react";
import PropTypes from "prop-types";
import { Box } from "@chakra-ui/core";

const SideBarContainer = ({ isOpen, sidebarTransition, children }) => {
  return (
    <Box
      height={"calc(100vh - 2.5rem)"}
      bg="#f4f5f7"
      position="fixed"
      bottom={0}
      right={0}
      width={350}
      px={2}
      borderRadius={2}
      overflowY="auto"
      boxShadow="xl"
      transform={isOpen ? "translateX(0)" : "translateX(400px)"}
      transition={sidebarTransition}
    >
      {children}
    </Box>
  );
};

SideBarContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  sidebarTransition: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.node //FIXME:
  ]).isRequired
};

export default SideBarContainer;
