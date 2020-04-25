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
import DueDatePopover from "./DueDatePopover";
import RemoveTaskPopover from "./RemoveTaskPopover";
import LabelsPopover from "../../labels/components/LabelsPopover";
import PriorityPopover from "../../priorities/components/PriorityPopover";
import SideModalTrigger from "../../../components/SideModalTrigger";

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
          templateRows="75px 125px 300px"
          gridGap={3}
          p={6}
        >
          {/* Edit Title */}
          <EditTaskTitle taskId={taskId} columnId={columnId} />

          {/* Edit Description */}
          <EditTaskDescription taskId={taskId} />

          {/* Sidebar */}
          <Box as="aside" gridColumn="3" gridRow="2 / span" alignSelf="start">
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
              {/* FIXME: TODO */}
              <SideModalTrigger icon="arrow-forward" label="Move Card" />
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
