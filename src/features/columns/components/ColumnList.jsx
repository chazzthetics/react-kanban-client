import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { selectCurrentBoard } from "../../boards/boardsSlice";
import ColumnItem from "./ColumnItem";
import CreateColumnForm from "./CreateColumnForm";

const ColumnList = () => {
  const currentBoard = useSelector(selectCurrentBoard);

  return (
    <Droppable droppableId="all-columns" direction="horizontal" type="column">
      {provided => (
        <div
          className="ColumnList"
          style={{ display: "flex", background: "#eee" }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {currentBoard &&
            currentBoard.columns.map((column, index) => (
              <Draggable
                key={`drag-${column}`}
                index={index}
                draggableId={`drag-${column}`}
              >
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ColumnItem columnId={column} />
                  </div>
                )}
              </Draggable>
            ))}
          {provided.placeholder}
          <CreateColumnForm />
        </div>
      )}
    </Droppable>
  );
};

export default ColumnList;
