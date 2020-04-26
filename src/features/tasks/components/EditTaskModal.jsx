import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  Box,
  Heading,
  Grid
} from "@chakra-ui/core";
import EditTaskTitle from "./EditTaskTitle";
import EditTaskDescription from "./EditTaskDescription";
import TaskActivityFeed from "./TaskActivityFeed";
import DueDatePopover from "./DueDatePopover";
import RemoveTaskPopover from "./RemoveTaskPopover";
import MoveTaskPopover from "./MoveTaskPopover";
import LabelsPopover from "../../labels/components/LabelsPopover";
import PriorityPopover from "../../priorities/components/PriorityPopover";

const EditTaskModal = ({ taskId, columnId, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="48rem" borderRadius={3} bg="#f4f5f7">
        <ModalCloseButton
          zIndex={6}
          color="gray.600"
          _hover={{ backgroundColor: "rgba(0,0,0,0.07)" }}
          _active={{ backgroundColor: "rgba(0,0,0,0.1)", color: "gray.800" }}
          _focus={{ outline: "none" }}
          borderRadius={50}
        />
        <Grid
          templateColumns="25px 3fr 1fr"
          templateRows="75px 175px 25px auto 100px"
          gridGap={3}
          p={6}
        >
          {/* Edit Title */}
          <EditTaskTitle taskId={taskId} columnId={columnId} />

          {/* Edit Description */}
          <EditTaskDescription taskId={taskId} />

          {/* Task Activity */}
          <TaskActivityFeed taskId={taskId} />

          {/* Sidebar */}
          <Box as="aside" gridColumn="3" gridRow="2" alignSelf="start">
            <Heading
              as="h3"
              fontSize="0.8rem"
              fontWeight={600}
              textTransform="uppercase"
            >
              Add to Card
            </Heading>
            <Box my={2}>
              <LabelsPopover taskId={taskId} />
              <PriorityPopover taskId={taskId} />
              <DueDatePopover taskId={taskId} />
            </Box>

            <Heading
              as="h3"
              fontSize="0.8rem"
              fontWeight={600}
              textTransform="uppercase"
            >
              Actions
            </Heading>
            <Box my={2}>
              <MoveTaskPopover taskId={taskId} columnId={columnId} />
              <RemoveTaskPopover taskId={taskId} columnId={columnId} />
            </Box>
          </Box>
        </Grid>
      </ModalContent>
    </Modal>
  );
};

EditTaskModal.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default memo(EditTaskModal);
