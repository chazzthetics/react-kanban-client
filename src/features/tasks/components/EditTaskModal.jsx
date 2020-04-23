import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  Grid,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Link
} from "@chakra-ui/core";
import EditTaskTitle from "./EditTaskTitle";
import EditTaskDescription from "./EditTaskDescription";
import DueDatePopover from "./DueDatePopover";
import LabelsPopover from "../../labels/components/LabelsPopover";
import PriorityPopover from "../../priorities/components/PriorityPopover";

const EditTaskModal = ({ taskId, columnId, isOpen, onClose }) => {
  //FIXME: fix styling...
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
        <ModalHeader>
          <EditTaskTitle taskId={taskId} columnId={columnId} />
        </ModalHeader>
        <ModalBody>
          <EditTaskDescription taskId={taskId} />

          <div>
            Add to Card
            <LabelsPopover taskId={taskId} />
            <PriorityPopover taskId={taskId} />
            <DueDatePopover taskId={taskId} />
          </div>
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

{
  /* <Popover>
<PopoverTrigger>
  <Link
    fontSize="0.875rem"
    fontWeight={400}
    color="gray.600"
    textDecor="underline"
  >
    {columnTitle}
  </Link>
</PopoverTrigger>
<PopoverContent zIndex={4}>Move list//TODO</PopoverContent>
</Popover> */
}
export default memo(EditTaskModal);
