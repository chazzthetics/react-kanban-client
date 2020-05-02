import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { tasksSelectors } from "../tasksSlice";
import { FiCheckSquare } from "react-icons/fi";
import { Tag, TagLabel, Box } from "@chakra-ui/core";

const ChecklistTag = ({ taskId }) => {
  const { checklist } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  const { items } = checklist || { items: [] };

  const totalCount = useMemo(() => (items ? items.length : 0), [items]);

  const isDoneCount = useMemo(
    () => (items ? items.filter(item => item.completed).length : 0),
    [items]
  );

  return items && items.length > 0 ? (
    <Box pt={1} mr={1} display="flex" alignItems="flex-end">
      <Tag
        size="sm"
        display="flex"
        alignItems="center"
        variantColor={isDoneCount === totalCount ? "green" : "gray"}
      >
        <Box as={FiCheckSquare} size="0.8rem" mr={1} />
        <TagLabel fontSize="0.8rem" color="gray.800">
          {isDoneCount}/{totalCount}
        </TagLabel>
      </Tag>
    </Box>
  ) : null;
};

ChecklistTag.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default ChecklistTag;
