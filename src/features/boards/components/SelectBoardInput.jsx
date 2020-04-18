import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  boardsSelectors,
  selectCurrentBoardId,
  changeBoard
} from "../boardsSlice";
import { Select } from "@chakra-ui/core";

const SelectBoardInput = () => {
  const current = useSelector(selectCurrentBoardId);
  const boards = useSelector(state => boardsSelectors.selectAll(state));

  const dispatch = useDispatch();

  const handleSelectChange = useCallback(
    e => {
      dispatch(changeBoard(e.target.value));
    },
    [dispatch]
  );

  return (
    <Select
      size="sm"
      borderRadius={4}
      bg="rgba(0,0,0,0.3)"
      border="none"
      color="white"
      fontWeight={700}
      cursor="pointer"
      value={current}
      onChange={handleSelectChange}
    >
      {boards.map(board => (
        <option key={board.uuid} value={board.uuid} style={{ fontWeight: 700 }}>
          {board.title}
        </option>
      ))}
    </Select>
  );
};

export default SelectBoardInput;
