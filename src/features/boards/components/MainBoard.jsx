import React from "react";
import BoardHeader from "./BoardHeader";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import {
  removeBoard,
  clearBoard,
  selectCurrentBoardId,
  selectCurrentBoard
} from "../boardsSlice";
import { columnsSelectors, reorderColumn } from "../../columns/columnsSlice";
import { reorderTask, reorderBetween } from "../../tasks/tasksSlice";
import { activitiesSelectors } from "../../activities/activitiesSlice";
import CreateBoardForm from "./CreateBoardForm";
import ColumnList from "../../columns/components/ColumnList";

const MainBoard = () => {
  //TODO: move out later
  const dispatch = useDispatch();
  const currentBoardId = useSelector(selectCurrentBoardId);

  const handleRemoveBoard = React.useCallback(() => {
    dispatch(removeBoard(currentBoardId));
  }, [dispatch, currentBoardId]);

  const handleClearBoard = React.useCallback(() => {
    dispatch(clearBoard(currentBoardId));
  }, [dispatch, currentBoardId]);

  const currentBoard = useSelector(selectCurrentBoard);
  const columns = useSelector(state => columnsSelectors.selectEntities(state));

  const handleDragEnd = result => {
    const { source, destination, type } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Reorder column
    if (type === "column") {
      const newOrder = [...currentBoard.columns];
      const [removed] = newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, removed);

      dispatch(reorderColumn({ boardId: currentBoardId, newOrder }));
      return;
    }

    const startColumn = columns[source.droppableId];
    const endColumn = columns[destination.droppableId];

    // Reorder task inside column
    if (type === "task" && startColumn.uuid === endColumn.uuid) {
      const newOrder = [...startColumn.tasks];
      const [removed] = newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, removed);

      dispatch(reorderTask({ columnId: startColumn.uuid, newOrder }));
      return;
    }

    // Reorder task between columns
    const startOrder = [...startColumn.tasks];
    const [removed] = startOrder.splice(source.index, 1);
    const endOrder = [...endColumn.tasks];
    endOrder.splice(destination.index, 0, removed);
    console.log("start", startColumn.uuid);
    console.log("end", endColumn.uuid);
    dispatch(
      reorderBetween({
        startColumnId: startColumn.uuid,
        endColumnId: endColumn.uuid,
        startOrder,
        endOrder
      })
    );
    return;
  };

  const activities = useSelector(state => activitiesSelectors.selectAll(state));
  const { user } = useSelector(state => state.auth);

  return (
    <div className="MainBoard">
      <BoardHeader />
      <CreateBoardForm />
      <div className="Activity">
        <h1 style={{ fontWeight: "bold" }}>Activity</h1>
        <ul>
          {activities.map(activity => (
            <div key={activity.id}>
              <li>{getActivity(user, activity)}</li>
              <li style={{ fontSize: ".8rem" }}>{activity.created_at}</li>
            </div>
          ))}
        </ul>
      </div>
      <button
        type="button"
        style={{
          padding: ".6rem 1rem",
          background: "red",
          color: "white"
        }}
        onClick={handleRemoveBoard}
      >
        Delete Board
      </button>
      <button
        type="button"
        style={{
          padding: ".6rem 1rem",
          background: "lightblue"
        }}
        onClick={handleClearBoard}
      >
        Clear Board
      </button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <ColumnList />
      </DragDropContext>
    </div>
  );
};

export default MainBoard;

function getActivity(user, activity) {
  let activityDescription;
  if (activity.recordable_type === "App\\Board") {
    if (activity.description === "board_created") {
      activityDescription = `${getInitials(user.name)} created a new board`;
    } else if (activity.description === "board_title_updated") {
      activityDescription = `${getInitials(user.name)} renamed this board ${
        activity.changes.before.title
      } to ${activity.changes.after.title}`;
    }
  }

  return activityDescription;
}

function getInitials(name) {
  const split = name.split(" ");
  const first = split[0][0];
  const last = split[1][0];

  return `${first} ${last}`;
}
