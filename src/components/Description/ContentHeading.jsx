import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Heading } from "@chakra-ui/core";

const ContentHeading = ({ icon, heading, children, action }) => {
  return (
    <>
      <Flex align="center" px={3} py={1}>
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
          {action}
        </Heading>
      </Flex>
      {children}
    </>
  );
};

ContentHeading.propTypes = {
  icon: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  action: PropTypes.element
};

export default ContentHeading;