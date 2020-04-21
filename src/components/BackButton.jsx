import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@chakra-ui/core";

const BackButton = ({ onClick, ...rest }) => {
  return (
    <IconButton
      icon="chevron-left"
      fontSize="1.6rem"
      size="sm"
      bg="transparent"
      aria-label="Show main sidebar content"
      opacity={0.5}
      position="absolute"
      left={0}
      _active={{ boxShadow: "none" }}
      _focus={{ boxShadow: "none" }}
      _hover={{ opacity: 0.8 }}
      onClick={onClick}
      {...rest}
    />
  );
};

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default BackButton;
