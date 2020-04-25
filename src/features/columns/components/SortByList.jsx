import React from "react";
import PropTypes from "prop-types";
import { useSort } from "../../../hooks/useSort";
import ColumnActionsButton from "./ColumnActionButton";

const SortByList = ({ columnId }) => {
  const {
    sortByNewest,
    sortByOldest,
    sortByName,
    sortByLowestPriority,
    sortByHighestPriority,
    sortByDueDate
  } = useSort(columnId);

  return (
    <>
      <ColumnActionsButton
        label="Date Created (Newest First)"
        onClick={sortByNewest}
      />
      <ColumnActionsButton
        label="Date Created (Oldest First)"
        onClick={sortByOldest}
      />
      <ColumnActionsButton
        label="Card Name (Alphabetically)"
        onClick={sortByName}
      />
      <ColumnActionsButton
        label="Priority (Highest First)"
        onClick={sortByHighestPriority}
      />
      <ColumnActionsButton
        label="Priority (Lowest First)"
        onClick={sortByLowestPriority}
      />
      <ColumnActionsButton label="Due Date" onClick={sortByDueDate} mb={2} />
    </>
  );
};

SortByList.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default SortByList;
