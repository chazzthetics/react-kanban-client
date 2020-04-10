import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { selectCurrentBoard } from "../../boards/boardsSlice";
import ColumnItem from "./ColumnItem";
import CreateColumnForm from "./CreateColumnForm";

const ColumnList = () => {
  const currentBoard = useSelector(selectCurrentBoard);

  return (
    <Droppable
      droppableId="all-columns"
      direction="horizontal"
      type="column-board"
    >
      {provided => (
        <div
          className="ColumnList"
          style={{ display: "flex", background: "#eee" }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {currentBoard &&
            currentBoard.columns.map((column, index) => (
              <ColumnItem columnId={column} index={index} key={column} />
            ))}
          {provided.placeholder}
          <CreateColumnForm />
        </div>
      )}
    </Droppable>
  );
  // return (
  //   <Droppable
  //     droppableId="all-columns"
  //     direction="horizontal"
  //     type="column-board"
  //   >
  //     {provided => (
  //       <div
  //         className="ColumnList"
  //         style={{ display: "flex", background: "#eee" }}
  //         ref={provided.innerRef}
  //         {...provided.droppableProps}
  //       >
  //         {currentBoard &&
  //           currentBoard.columns.map((column, index) => (
  //             <Droppable
  //               droppableId={column}
  //               direction="horizontal"
  //               type="column"
  //               key={column}
  //               isDropDisabled={column === provided.droppableId}
  //             >
  //               {provided => (
  //                 <div ref={provided.innerRef} {...provided.droppableProps}>
  //                   <ColumnItem columnId={column} index={index} />
  //                   {provided.placeholder}
  //                 </div>
  //               )}
  //             </Droppable>
  //           ))}
  //         {provided.placeholder}
  //         <CreateColumnForm />
  //       </div>
  //     )}
  //   </Droppable>
  // );
};

export default ColumnList;
