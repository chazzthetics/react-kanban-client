import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { columnsSelectors } from "../columnsSlice";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/core";

const ColumnTitle = ({ columnTitle }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  const handleChange = useCallback(e => {
    setTitle(e.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    console.log("title");
  }, []);

  useEffect(() => {
    if (columnTitle) {
      setTitle(columnTitle);
    }
  }, [columnTitle]);

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
  columnTitle: PropTypes.string.isRequired
};

export default ColumnTitle;
