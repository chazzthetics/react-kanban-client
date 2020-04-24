import React from "react";
import PropTypes from "prop-types";
import { Button } from "@chakra-ui/core";

const SaveButton = ({ label = "Save", color = "green", ...rest }) => {
  return (
    <Button
      type="submit"
      size="sm"
      color="white"
      bg={`${color}.400`}
      fontWeight="normal"
      _hover={{ backgroundColor: `${color}.300` }}
      _active={{ backgroundColor: `${color}.500`, boxShadow: "none" }}
      _focus={{ boxShadow: "none" }}
      {...rest}
    >
      {label}
    </Button>
  );
};

SaveButton.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string
};

export default SaveButton;
