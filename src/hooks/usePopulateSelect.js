import { useSelector } from "react-redux";
import {
  boardsSelectors,
  selectCurrentBoardId
} from "../features/boards/boardsSlice";
import { columnsSelectors } from "../features/columns/columnsSlice";

export const usePopulateSelect = ({ selectedIds, columnId }) => {
  const boards = useSelector(state => boardsSelectors.selectAll(state));
  const currentBoardId = useSelector(selectCurrentBoardId);

  const columns = useSelector(state => columnsSelectors.selectEntities(state));

  const { columns: boardColumns } = useSelector(state =>
    boardsSelectors.selectById(state, selectedIds.board || currentBoardId)
  );

  const { tasks } = useSelector(state =>
    columnsSelectors.selectById(state, selectedIds.list || columnId)
  );

  return {
    boards,
    columns,
    boardColumns,
    tasks
  };
};
