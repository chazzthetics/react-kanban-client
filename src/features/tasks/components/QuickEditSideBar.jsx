import React from "react";
import PropTypes from "prop-types";
import { FiTag } from "react-icons/fi";
import { Box } from "@chakra-ui/core";
import LabelsPopover from "../../labels/components/LabelsPopover";
import MoveTaskPopover from "./MoveTaskPopover";
import DueDatePopover from "./DueDatePopover";
import QuickEditButton from "./QuickEditButton";
import RemoveTaskPopover from "./RemoveTaskPopover";

const QuickEditSideBar = ({ taskId, columnId }) => {
  return (
    <Box position="absolute" top={0} right={-168} cursor="pointer">
      <LabelsPopover
        taskId={taskId}
        trigger={<QuickEditButton icon={FiTag} label="Edit Labels" />}
      />
      <MoveTaskPopover
        taskId={taskId}
        columnId={columnId}
        trigger={<QuickEditButton icon="arrow-forward" label="Move" />}
      />
      <DueDatePopover
        taskId={taskId}
        trigger={<QuickEditButton icon="time" label="Change Due Date" />}
      />
      <RemoveTaskPopover
        taskId={taskId}
        columnId={columnId}
        trigger={<QuickEditButton icon="delete" label="Remove" />}
      />
    </Box>
  );
};

QuickEditSideBar.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired
};

export default QuickEditSideBar;
