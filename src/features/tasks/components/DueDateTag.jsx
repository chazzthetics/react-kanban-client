import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { tasksSelectors } from "../tasksSlice";
import { formatDate } from "../../../utils/formatDate";
import { getDueDateColor } from "../../../utils/getDueDateColor";
import { Box, Icon, Tag, TagLabel } from "@chakra-ui/core";

const DueDateTag = ({ taskId }) => {
  const { due_date, completed } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  const formattedDate = formatDate(due_date);

  return due_date ? (
    <Box pt={1} mr={2} display="flex" alignItems="flex-end">
      <Tag
        bg={completed ? "green.100" : `${getDueDateColor(due_date)}.100`}
        size="sm"
        display="flex"
        alignItems="center"
        onClick={e => e.stopPropagation()}
      >
        <Icon name="time" size="0.875rem" mr={1} />
        <TagLabel fontSize="0.8rem">{formattedDate}</TagLabel>
      </Tag>
    </Box>
  ) : null;
};

DueDateTag.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default React.memo(DueDateTag);
