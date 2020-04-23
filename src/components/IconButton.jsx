import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { IconButton as ChakraIconButton, Button } from "@chakra-ui/core";

const IconButton = forwardRef(
  (
    { icon, label, onClick, text, isImage = false, fontSize = "1rem", ...rest },
    ref
  ) => {
    return !text ? (
      <ChakraIconButton
        size="sm"
        icon={icon}
        aria-label={label}
        color="white"
        bg={isImage ? "hsla(0,0%,0%,0.3)" : "hsla(0,0%,100%,0.3)"}
        fontSize={fontSize}
        _hover={{
          backgroundColor: isImage ? "hsla(0,0%,0%,0.4)" : "hsla(0,0%,100%,0.2)"
        }}
        _active={{
          backgroundColor: isImage ? "hsla(0,0%,0%,0.5)" : "hsla(0,0%,100%,0.1)"
        }}
        _focus={{
          boxShadow: "none",
          backgroundColor: isImage ? "hsla(0,0%,0%,0.4)" : "hsla(0,0%,100%,0.2)"
        }}
        ref={ref}
        onClick={onClick}
        {...rest}
      />
    ) : (
      <Button
        size="sm"
        fontSize={fontSize}
        color="white"
        leftIcon={icon}
        bg={isImage ? "hsla(0,0%,0%,0.3)" : "hsla(0,0%,100%,0.3)"}
        _hover={{
          backgroundColor: isImage ? "hsla(0,0%,0%,0.4)" : "hsla(0,0%,100%,0.2)"
        }}
        _active={{
          backgroundColor: isImage ? "hsla(0,0%,0%,0.5)" : "hsla(0,0%,100%,0.1)"
        }}
        _focus={{
          boxShadow: "none",
          backgroundColor: isImage ? "hsla(0,0%,0%,0.4)" : "hsla(0,0%,100%,0.2)"
        }}
        ref={ref}
        onClick={onClick}
        {...rest}
      >
        {text}
      </Button>
    );
  }
);

IconButton.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType])
    .isRequired,
  label: PropTypes.string.isRequired,
  text: PropTypes.string,
  isImage: PropTypes.bool,
  onClick: PropTypes.func
};

export default IconButton;
