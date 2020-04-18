import React from "react";
import PropTypes from "prop-types";
import ColumnTitle from "./ColumnTitle";
import { Flex } from "@chakra-ui/core";
import ColumnActionsPopover from "./ColumnActionsPopover";

const ColumnHeader = ({ columnId }) => {
  return (
    <Flex align="center" justify="space-between" pl={1} py={1} h="2.5rem">
      <ColumnTitle columnId={columnId} />
      <ColumnActionsPopover columnId={columnId} />
    </Flex>
  );
};

ColumnHeader.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ColumnHeader;
