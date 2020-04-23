import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { tasksSelectors } from "../tasksSlice";
import { format } from "date-fns";
import { Icon, Tag, TagLabel } from "@chakra-ui/core";

//TODO: color code dates
const DueDateTag = ({ taskId }) => {
  const { due_date } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  const formattedDate = useMemo(() => format(new Date(due_date), "MMM d"), [
    due_date
  ]);

  return due_date ? (
    <Tag
      bg="yellow.300"
      size="sm"
      display="flex"
      alignItems="center"
      mr={3}
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
