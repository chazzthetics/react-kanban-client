import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  Box,
  Flex
} from "@chakra-ui/core";
import EditTaskTitle from "./EditTaskTitle";
import EditTaskDescription from "./EditTaskDescription";
import EditTaskChecklist from "./EditTaskChecklist";
import TaskActivityFeed from "./TaskActivityFeed";
import EditTaskModalLabelList from "./EditTaskModalLabelList";
import EditTaskModalDueDate from "./EditTaskModalDueDate";
import EditTaskModalPriority from "./EditTaskModalPriority";
import ModalSideBar from "./ModalSideBar";

const EditTaskModal = ({ taskId, columnId, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap={true}>
      <ModalOverlay />
      <ModalContent maxW="48rem" minH="43rem" borderRadius={3} bg="#f4f5f7">
        <ModalCloseButton
          zIndex={6}
          color="gray.600"
          _hover={{ backgroundColor: "rgba(0,0,0,0.07)" }}
          _active={{ backgroundColor: "rgba(0,0,0,0.1)", color: "gray.800" }}
          _focus={{ outline: "none" }}
          borderRadius={50}
        />
        <ModalBody py={6}>
          <EditTaskTitle taskId={taskId} columnId={columnId} />

          <Box position="relative">
            <Flex w="72%" pl={10} ml={-1} pb={4}>
              <EditTaskModalLabelList taskId={taskId} />
              <EditTaskModalDueDate taskId={taskId} />
            </Flex>

            <Flex w="72%" pl={10} ml={-1} pb={4}>
              <EditTaskModalPriority taskId={taskId} />
            </Flex>

            <Box w="72%">
              <EditTaskDescription taskId={taskId} />
              <EditTaskChecklist taskId={taskId} />
              <TaskActivityFeed taskId={taskId} />
            </Box>
            <ModalSideBar taskId={taskId} columnId={columnId} />
          </Box>
        </ModalBody>
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
