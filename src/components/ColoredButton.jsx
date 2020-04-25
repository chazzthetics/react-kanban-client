import React from "react";
import PropTypes from "prop-types";
import { Flex, PseudoBox, Icon } from "@chakra-ui/core";

const ColoredButton = ({
  color,
  onClick,
  children,
  isChecked = false,
  ...rest
}) => {
  return (
    <Flex position="relative">
      <PseudoBox
        bg={color}
        borderRadius={3}
        h="2rem"
        w="100%"
        mb={1}
        as="button"
        _focus={{ outline: "none" }}
        _hover={{
          borderLeftWidth: "0.5rem",
          borderLeftStyle: "solid",
          borderLeftColor: "hsla(0,0%,0%,0.3)",
          transform: "rotate(-1deg)"
        }}
        transition="border 120ms ease-in, transform 120ms ease-in"
        onClick={onClick}
        {...rest}
      >
        {children ? children : null}
      </PseudoBox>
      {isChecked && (
        <Icon
          name="check"
          color="white"
          position="absolute"
          fontSize="0.8rem"
          top="8.5px"
          right={2}
        />
      )}
    </Flex>
  );
};

ColoredButton.propTypes = {
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isChecked: PropTypes.bool,
  children: PropTypes.element
};

export default ColoredButton;
