import React from "react";
import ColumnActionsButton from "./ColumnActionButton";

const SortByList = () => {
  return (
    <>
      <ColumnActionsButton
        label="Date Created (Newest First)"
        onClick={() => {}}
      />
      <ColumnActionsButton
        label="Date Created (Oldest First)"
        onClick={() => {}}
      />
      <ColumnActionsButton
        label="Card Name (Alphabetically)"
        onClick={() => {}}
      />
      <ColumnActionsButton label="Due Date" onClick={() => {}} mb={2} />
    </>
  );
};

export default SortByList;
