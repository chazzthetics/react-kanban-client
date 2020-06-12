import React from "react";
import PropTypes from "prop-types";
import { Box, Heading, Flex } from "@chakra-ui/core";
import DueDatePopover from "./DueDatePopover";
import RemoveTaskPopover from "./RemoveTaskPopover";
import MoveTaskPopover from "./MoveTaskPopover";
import ChecklistPopover from "./ChecklistPopover";
import CopyTaskPopover from "./CopyTaskPopover";
import LabelsPopover from "../../labels/components/LabelsPopover";
import PriorityPopover from "../../priorities/components/PriorityPopover";

const ModalSideBar = ({ taskId, columnId }) => {
  return (
    <Box
      className="ModalSideBar"
      as="aside"
      ml={3}
      position="absolute"
      right={0}
      top={0}
      zIndex={2}
      display={{ xs: "none", md: "block" }}
    >
      <Flex flexDir="column" pt={"2px"}>
        <Heading
          as="h3"
          fontSize="0.8rem"
          fontWeight={600}
          textTransform="uppercase"
        >
          Add to Card
        </Heading>
        <Flex flexDir="column" my={2}>
          <LabelsPopover taskId={taskId} />
          <PriorityPopover taskId={taskId} />
          <ChecklistPopover taskId={taskId} />
          <DueDatePopover taskId={taskId} />
        </Flex>

        <Heading
          as="h3"
          fontSize="0.8rem"
          fontWeight={600}
          textTransform="uppercase"
        >
          Actions
        </Heading>
        <Flex flexDir="column" my={2}>
          <MoveTaskPopover taskId={taskId} columnId={columnId} />
          <CopyTaskPopover taskId={taskId} columnId={columnId} />
          <RemoveTaskPopover taskId={taskId} columnId={columnId} />
        </Flex>
      </Flex>
    </Box>
  );
};

ModalSideBar.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired
};

export default ModalSideBar;
