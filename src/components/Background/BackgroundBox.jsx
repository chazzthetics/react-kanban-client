import React from "react";
import PropTypes from "prop-types";
import { PseudoBox, Box, Text } from "@chakra-ui/core";

const BackgroundBox = ({ background, onClick, text = "" }) => {
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
    >
      <Box bg={background} h="6rem" borderRadius={4} mb={2}></Box>
      {text && (
        <Text fontSize="0.9rem" textAlign="center">
          {text}
        </Text>
      )}
    </PseudoBox>
  );
};

BackgroundBox.propTypes = {
  background: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string
};

export default BackgroundBox;
