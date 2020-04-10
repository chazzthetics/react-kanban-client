import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { columnsSelectors, updateColumnTitle } from "../columnsSlice";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/core";

const ColumnTitle = ({ columnId }) => {
  const dispatch = useDispatch();
  const column = useSelector(state =>
    columnsSelectors.selectById(state, columnId)
  );

  const [title, setTitle] = useState("");

  const handleChange = useCallback(e => {
    setTitle(e.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    dispatch(updateColumnTitle({ columnId, newTitle: title }));
  }, [dispatch, columnId, title]);

  useEffect(() => {
    if (column) {
      setTitle(column.title);
    }
  }, [column]);

  return (
    <div className="ColumnTitle">
      <Editable onSubmit={handleSubmit} value={title}>
        <EditablePreview
          d="flex"
          alignItems="center"
          h="2rem"
          borderRadius={4}
          cursor="pointer"
          _hover={{ backgroundColor: `green.400` }}
        />
        <EditableInput onChange={handleChange} />
      </Editable>
    </div>
  );
};

ColumnTitle.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ColumnTitle;
