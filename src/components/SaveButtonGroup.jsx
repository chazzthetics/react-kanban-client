import React from "react";
import PropTypes from "prop-types";
import { Flex, CloseButton } from "@chakra-ui/core";
import SaveButton from "./SaveButton";

const SaveButtonGroup = ({ label, onClose, ...rest }) => {
  return (
    <Flex align="center">
      <SaveButton label={label} {...rest} />
      <CloseButton
        aria-label="Close form"
        opacity={0.5}
        mx={1}
        _active={{ boxShadow: "none" }}
        _focus={{ boxShadow: "none" }}
        _hover={{ opacity: 0.8 }}
        onClick={onClose}
      />
    </Flex>
  );
};

SaveButtonGroup.propTypes = {
  label: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

export default SaveButtonGroup;
