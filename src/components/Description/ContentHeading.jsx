import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Heading } from "@chakra-ui/core";

const ContentHeading = ({ icon, heading, action, ...rest }) => {
  return (
    <Flex align="center" px={3} py={1} {...rest}>
      <Box as={icon} size="1.6rem" mr={2} color="gray.800" />
      <Heading
        as="h4"
        fontSize="1rem"
        color="gray.800"
        fontWeight={600}
        d="flex"
        alignItems="center"
      >
        {heading}
        {action && action}
      </Heading>
    </Flex>
  );
};

ContentHeading.propTypes = {
  icon: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  action: PropTypes.element
};

export default ContentHeading;
