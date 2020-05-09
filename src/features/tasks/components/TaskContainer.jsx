import React, { memo, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { PseudoBox } from "@chakra-ui/core";

const TaskContainer = ({ onHover, onLeave, onOpen, children }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        block: "center",
        inline: "start"
      });
    }
  }, [scrollRef]);

  return (
    <PseudoBox
      ref={scrollRef}
      className="TaskItem"
      cursor="pointer"
      bg="white"
      px={2}
      py="6px"
      mb={2}
      borderRadius={3}
      w={"16rem"}
      shadow="sm"
      _hover={{ backgroundColor: "gray.100" }}
      transition="background-color 120ms ease-in"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onOpen}
      position="relative"
    >
      {children}
    </PseudoBox>
  );
};

TaskContainer.propTypes = {
  onHover: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default memo(TaskContainer);
