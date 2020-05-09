import React from "react";
import PropTypes from "prop-types";
import { Button } from "@chakra-ui/core";

const ActivityButton = ({ label, isSelected, onSelect, ...rest }) => {
  return (
    <Button
      w="47%"
      d="inline-block"
      size="sm"
      fontWeight="400"
      bg={isSelected ? "blue.500" : "transparent"}
      color={isSelected ? "white" : "gray.900"}
      textDecor={isSelected ? "none" : "underline"}
      mx={1}
      _hover={{
        backgroundColor: "blue.400",
        color: "white",
        textDecoration: "none"
      }}
      _active={{
        backgroundColor: "blue.600",
        color: "white",
        textDecoration: "none",
        boxShadow: "none"
      }}
      _focus={{
        backgroundColor: "blue.500",
        color: "white",
        textDecoration: "none",
        boxShadow: "none"
      }}
      transition="all 120ms ease-in"
      onClick={onSelect}
      {...rest}
    >
      {label}
    </Button>
  );
};

ActivityButton.propTypes = {
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default ActivityButton;
