import React from "react";
import PropTypes from "prop-types";
import { PseudoBox, Text } from "@chakra-ui/core";

const ColumnActionButton = ({ label, onClick, ...rest }) => {
  return (
    <PseudoBox
      as="button"
      fontSize="0.9rem"
      onClick={onClick}
      aria-label={label}
      opacity={0.8}
      py={1}
      mb={1}
      borderRadius={3}
      textAlign="left"
      w="100%"
      _hover={{ backgroundColor: "gray.100" }}
      _focus={{ outline: "none" }}
      {...rest}
    >
      <Text ml={3}>{label}</Text>
    </PseudoBox>
  );
};

ColumnActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ColumnActionButton;
