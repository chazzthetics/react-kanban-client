import React from "react";
import PropTypes from "prop-types";
import { Button } from "@chakra-ui/core";

const SaveButton = ({ label = "Save", ...rest }) => {
  return (
    <Button
      type="submit"
      size="sm"
      color="white"
      bg="green.400"
      fontWeight="normal"
      _hover={{ backgroundColor: "green.500" }}
      _active={{ backgroundColor: "green.500", boxShadow: "none" }}
      _focus={{ boxShadow: "outline" }}
      {...rest}
    >
      {label}
    </Button>
  );
};

SaveButton.propTypes = {
  label: PropTypes.string
};

export default SaveButton;
