import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { IconButton } from "@chakra-ui/core";

const ColorRadioButton = forwardRef(
  ({ value, isChecked = false, isDisabled = false, ...rest }, ref) => {
    return (
      <IconButton
        ref={ref}
        role="radio"
        aria-checked={isChecked}
        aria-label={value}
        icon={isChecked ? "check" : null}
        color="white"
        w={35}
        h={25}
        px={0}
        my={1}
        bg={`${value}.500`}
        borderRadius={4}
        _hover={{
          backgroundColor: `${value}.400`,
          boxShadow: "sm"
        }}
        _active={{ backgroundColor: `${value}.700` }}
        _focus={{
          border: `2px solid ${value}.800`,
          boxShadow: "sm"
        }}
        {...rest}
      />
    );
  }
);

ColorRadioButton.propTypes = {
  value: PropTypes.string.isRequired
};

export default ColorRadioButton;
