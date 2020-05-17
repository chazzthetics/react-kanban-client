import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { Button } from "@chakra-ui/core";

const QuickEditButton = forwardRef(({ icon, label, ...rest }, ref) => {
  return (
    <Button
      size="sm"
      leftIcon={icon}
      fontWeight={400}
      display="flex"
      color="white"
      bg="rgba(0,0,0,0.7)"
      borderRadius={3}
      px={4}
      mb={1}
      ref={ref}
      {...rest}
      _hover={{ transform: "translateX(5px)" }}
      _active={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      _focus={{ boxShadow: "none" }}
    >
      {label}
    </Button>
  );
});

QuickEditButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired
};

export default QuickEditButton;
