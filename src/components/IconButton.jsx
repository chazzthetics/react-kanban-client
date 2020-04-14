import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { IconButton as Button } from "@chakra-ui/core";

const IconButton = forwardRef(
  ({ icon, label, fontSize = "1rem", ...rest }, ref) => {
    return (
      <Button
        icon={icon}
        aria-label={label}
        size="sm"
        color="white"
        bg="hsla(0,0%,100%,0.3)"
        fontSize={fontSize}
        _hover={{ backgroundColor: "hsla(0,0%,100%,0.2)" }}
        _active={{ backgroundColor: "hsla(0,0%,100%,0.1)" }}
        _focus={{ boxShadow: "none", backgroundColor: "hsla(0,0%,100%,0.2)" }}
        ref={ref}
        {...rest}
      />
    );
  }
);

IconButton.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType])
    .isRequired,
  label: PropTypes.string.isRequired
};

export default IconButton;
