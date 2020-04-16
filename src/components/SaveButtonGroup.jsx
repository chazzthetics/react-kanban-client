import React from "react";
import PropTypes from "prop-types";
import { CloseButton } from "@chakra-ui/core";
import SaveButton from "./SaveButton";

const SaveButtonGroup = ({ onClose }) => {
  return (
    <div>
      <SaveButton />
      <CloseButton
        aria-label="Close description form"
        opacity={0.5}
        mx={1}
        _active={{ boxShadow: "none" }}
        _focus={{ boxShadow: "none" }}
        _hover={{ opacity: 0.8 }}
        onClick={onClose}
      />
    </div>
  );
};

SaveButtonGroup.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default SaveButtonGroup;
