import React from "react";
import PropTypes from "prop-types";
import { PseudoBox, Box, Text } from "@chakra-ui/core";

const BackgroundBox = ({
  onClick,
  children,
  background = "gray.600",
  image = "",
  text = "",
  ...rest
}) => {
  return (
    <PseudoBox
      w="48%"
      m="auto"
      cursor="pointer"
      aria-label={text}
      role="button"
      onClick={onClick}
      _hover={{ opacity: 0.8 }}
      _active={{ opacity: 1 }}
      transition="opacity 100ms ease-in"
    >
      <Box
        bg={background}
        backgroundImage={image}
        h="6rem"
        borderRadius={4}
        mb={2}
        {...rest}
      >
        {children}
      </Box>
      {text && (
        <Text fontSize="0.9rem" textAlign="center">
          {text}
        </Text>
      )}
    </PseudoBox>
  );
};

BackgroundBox.propTypes = {
  background: PropTypes.string,
  image: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element,
  text: PropTypes.string
};

export default BackgroundBox;
