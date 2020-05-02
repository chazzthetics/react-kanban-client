import React from "react";
import PropTypes from "prop-types";
import { Button } from "@chakra-ui/core";

const LightButton = ({ label, onClick, ...rest }) => {
  return (
    <Button
      size="sm"
      h="2rem"
      mr={1}
      fontSize="0.875rem"
      fontWeight={400}
      alignSelf="flex-start"
      backgroundColor="#ebecf0"
      _focus={{ boxShadow: "none" }}
      onClick={onClick}
      {...rest}
    >
      {label}
    </Button>
  );
};

LightButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default LightButton;
