import React from "react";
import PropTypes from "prop-types";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  PopoverFooter
} from "@chakra-ui/core";

const PopoverContainer = ({ trigger, heading, footer, children, ...rest }) => {
  return (
    <Popover placement="bottom-start" {...rest}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent
        w="18rem"
        zIndex={4}
        _focus={{ boxShadow: "none", outline: "none" }}
      >
        <PopoverHeader textAlign="center" fontSize="0.9rem" opacity={0.8}>
          {heading}
        </PopoverHeader>
        <PopoverCloseButton
          opacity={0.6}
          _hover={{ opacity: 1 }}
          _active={{ boxShadow: "none" }}
        />
        <PopoverBody>{children}</PopoverBody>
        {footer && <PopoverFooter>{footer}</PopoverFooter>}
      </PopoverContent>
    </Popover>
  );
};

PopoverContainer.propTypes = {
  trigger: PropTypes.element.isRequired,
  heading: PropTypes.string.isRequired,
  footer: PropTypes.element,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default PopoverContainer;
