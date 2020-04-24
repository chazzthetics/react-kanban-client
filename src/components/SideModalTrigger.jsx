import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { Button } from "@chakra-ui/core";

const SideModalTrigger = forwardRef(({ icon, label, ...rest }, ref) => {
  return (
    <Button
      size="sm"
      leftIcon={icon}
      fontWeight={400}
      w="12rem"
      my={1}
      h="2.25rem"
      fontSize="0.9rem"
      justifyContent="flex-start"
      backgroundColor="#ebecf0"
      ref={ref}
      _focus={{ boxShadow: "none" }}
      {...rest}
    >
      {label}
    </Button>
  );
});

SideModalTrigger.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  label: PropTypes.string.isRequired
};

export default SideModalTrigger;
