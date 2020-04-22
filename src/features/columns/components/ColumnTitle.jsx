import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useEditable } from "../../../hooks/useEditable";
import { columnsSelectors, updateColumnTitle } from "../columnsSlice";
import { Box, Editable, EditableInput, EditablePreview } from "@chakra-ui/core";

const ColumnTitle = ({ columnId }) => {
  const dispatch = useDispatch();

  const column = useSelector(state =>
    columnsSelectors.selectById(state, columnId)
  );

  const [title, handleChange] = useEditable(column, "title");

  const handleSubmit = useCallback(() => {
    dispatch(updateColumnTitle({ columnId, newTitle: title }));
  }, [dispatch, columnId, title]);

  return (
    <Box className="ColumnTitle">
      <Editable onSubmit={handleSubmit} value={title}>
        <EditablePreview
          d="inline-flex"
          px={2}
          fontWeight={600}
          fontSize="0.9rem"
          borderRadius="2px"
          cursor="pointer"
          as="button"
        />
        <EditableInput
          as="input"
          flexGrow={2}
          onChange={handleChange}
          fontWeight={600}
          px={2}
          w="11.5rem"
          py="1.90px"
          fontSize="0.9rem"
          _focus={{
            backgroundColor: "white",
            boxShadow: "0 0 0 2px #3182ce",
            borderColor: "#3182ce",
            borderRadius: "2px"
          }}
        />
      </Editable>
    </Box>
  );
};

ColumnTitle.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ColumnTitle;
