import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { boardsSelectors, changeBoard } from "../features/boards/boardsSlice";

const RawBar = () => {
  const boards = useSelector(state => boardsSelectors.selectAll(state));
  const { current } = useSelector(state => state.boards);

  const dispatch = useDispatch();
  const handleSelectChange = useCallback(
    e => {
      dispatch(changeBoard(e.target.value));
    },
    [dispatch]
  );

  return (
    <select value={current} onChange={handleSelectChange}>
      {boards.map(board => (
        <option key={board.uuid} value={board.uuid}>
          {board.title}
        </option>
      ))}
    </select>
  );
};

export default React.memo(RawBar);
