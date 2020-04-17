import React from "react";
import PropTypes from "prop-types";
import ColumnTitle from "./ColumnTitle";
import { FiMoreHorizontal } from "react-icons/fi";
import { Flex, IconButton } from "@chakra-ui/core";

const ColumnHeader = ({ columnId }) => {
  return (
    <Flex align="center" justify="space-between" pl={1} py={1} h="2.5rem">
      <ColumnTitle columnId={columnId} />
      <IconButton
        icon={FiMoreHorizontal}
        size="sm"
        fontSize="1rem"
        color="gray.600"
        bg="transparent"
        _hover={{ backgroundColor: "rgba(9,30,66,.08)", color: "gray.700" }}
        _focus={{
          boxShadow: "none",
          backgroundColor: "hsla(0,0%,100%,0.2)",
          color: "gray.800"
        }}
        _active={{ backgroundColor: "rgba(9,30,66,.13)", color: "gray.800" }}
      />
    </Flex>
  );
};

ColumnHeader.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ColumnHeader;
