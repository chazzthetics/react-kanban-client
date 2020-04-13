import React from "react";
import PropTypes from "prop-types";
import { Box, IconButton, CloseButton, useDisclosure } from "@chakra-ui/core";
import { FiAlignJustify } from "react-icons/fi";

const SideBar = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label="Open sidebar"
        variantColor="teal"
        size="sm"
        icon={FiAlignJustify}
        onClick={onOpen}
      />

      <Box
        height={"calc(100vh - 2.5rem)"}
        bg="#ddd"
        position="fixed"
        bottom={0}
        right={0}
        width={350}
        transform={isOpen ? "translateX(0)" : "translateX(400px)"}
        transition="transform 130ms ease-in"
        overflowY="auto"
        boxShadow="xl"
      >
        <CloseButton onClick={onClose} aria-label="Close sidebar" />
        <div style={{ padding: "1rem 1.2rem" }}>{children}</div>
      </Box>
    </>
  );
};

SideBar.propTypes = {
  children: PropTypes.element.isRequired
};

export default SideBar;
