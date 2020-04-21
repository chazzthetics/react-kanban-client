import React from "react";
import PropTypes from "prop-types";
import { PseudoBox } from "@chakra-ui/core";

const TaskContainer = ({ onHover, onLeave, children }) => {
  return (
    <PseudoBox
      className="TaskItem"
      cursor="pointer"
      bg="white"
      px={2}
      py="6px"
      borderRadius={3}
      mb={2}
      shadow="sm"
      _hover={{ backgroundColor: "gray.100" }}
      transition="background-color 120ms ease-in"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      position="relative"
    >
      {children}
    </PseudoBox>
  );
};

TaskContainer.propTypes = {
  onHover: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default TaskContainer;
