import React from "react";
import PropTypes from "prop-types";
import { Button } from "@chakra-ui/core";

const RemoveButton = ({ onClick }) => {
  return (
    <Button
      type="button"
      size="sm"
      color="white"
      bg="red.300"
      fontWeight="normal"
      _hover={{ backgroundColor: "red.400" }}
      _active={{ backgroundColor: "red.500", boxShadow: "none" }}
      _focus={{ boxShadow: "none" }}
      onClick={onClick}
    >
      Remove
    </Button>
  );
};

RemoveButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default RemoveButton;
