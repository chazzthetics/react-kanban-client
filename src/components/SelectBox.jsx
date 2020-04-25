import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { PseudoBox, Box, Select } from "@chakra-ui/core";

const SelectBox = forwardRef(({ label, name, children, ...rest }, ref) => {
  return (
    <PseudoBox
      h="3rem"
      py={1}
      px={4}
      mb={2}
      bg="gray.200"
      borderRadius={2}
      position="relative"
      {...rest}
    >
      <Box fontSize="0.8rem" fontWeight={500}>
        <label htmlFor={name}>{label}</label>
      </Box>
      <Select
        id={name}
        name={name}
        position="absolute"
        top={2}
        bottom={0}
        left={0}
        fontSize="0.8rem"
        variant="unstyled"
        iconSize={0}
        cursor="pointer"
        borderRadius={2}
        h="3rem"
        px={4}
        py={1}
        ref={ref}
      >
        {children}
      </Select>
    </PseudoBox>
  );
});

SelectBox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
};

export default SelectBox;
