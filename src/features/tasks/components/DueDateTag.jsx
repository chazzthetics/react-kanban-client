import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { tasksSelectors } from "../tasksSlice";
import { formatDate } from "../../../utils/formatDate";
import { getDueDateColor } from "../../../utils/getDueDateColor";
import { Icon, Tag, TagLabel } from "@chakra-ui/core";

const DueDateTag = ({ taskId }) => {
  const { due_date, completed } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  const formattedDate = formatDate(due_date);

  return due_date ? (
    <Tag
      bg={completed ? "green.200" : `${getDueDateColor(due_date)}.200`}
      size="sm"
      display="flex"
      alignItems="center"
      mr={1}
      onClick={e => e.stopPropagation()}
    >
      <Icon name="time" size="0.875rem" mr={1} />
      <TagLabel fontWeight={400} fontSize="0.8rem">
        {formattedDate}
      </TagLabel>
    </Tag>
  ) : null;
};

DueDateTag.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default DueDateTag;
