import React from "react";
import PropTypes from "prop-types";
import { PseudoBox, Flex, Text } from "@chakra-ui/core";

const SideBarButton = ({
  icon,
  text,
  onClick,
  subText = "",
  alignIcon = "center",
  fontSize = "0.9rem",
  fontWeight = 600,
  ...rest
}) => {
  return (
    <PseudoBox
      py={2}
      px={3}
      borderRadius={4}
      as="button"
      w="100%"
      _hover={{ backgroundColor: "hsla(0,0%,0%,0.075)" }}
      _active={{ backgroundColor: "hsla(0,0%,0%,0.1)" }}
      _focus={{ outline: "none" }}
      transition="background-color 100ms ease-in"
      aria-label={text}
      role="button"
      onClick={onClick}
      {...rest}
    >
      <Flex align={alignIcon}>
        {icon && <div>{icon}</div>}
        <div>
          <Text
            textAlign="left"
            fontSize={fontSize}
            fontWeight={fontWeight}
            color="gray.800"
          >
            {text}
          </Text>
          {subText && (
            <Text fontSize="sm" fontWeight={400} color="gray.500">
              {subText}
            </Text>
          )}
        </div>
      </Flex>
    </PseudoBox>
  );
};

SideBarButton.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string.isRequired,
  subText: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  alignIcon: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.number
};

export default SideBarButton;
