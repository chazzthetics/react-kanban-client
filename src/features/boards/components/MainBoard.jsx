import React from "react";
import BoardHeader from "./BoardHeader";
import ColumnList from "../../columns/components/ColumnList";
import CreateColumnForm from "../../columns/components/CreateColumnForm";
import { useSelector, useDispatch } from "react-redux";
import { createBoard, removeBoard, selectCurrentBoardId } from "../boardsSlice";
import { makeBoard } from "../../../utils/makeEntity";
import { useForm } from "react-hook-form";

const MainBoard = () => {
  //TODO: move out later
  const dispatch = useDispatch();
  const currentBoardId = useSelector(selectCurrentBoardId);
  const deleteBoard = React.useCallback(() => {
    dispatch(removeBoard(currentBoardId));
  }, [dispatch, currentBoardId]);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = React.useCallback(
    data => {
      const board = makeBoard(data.title, "green");
      dispatch(createBoard(board));
      reset();
    },
    [dispatch, reset]
  );

  return (
    <div className="MainBoard">
      <BoardHeader />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Create new board"
          style={{ border: "1px solid black" }}
          name="title"
          ref={register}
        />
        <button type="submit">Add</button>
      </form>
      <button
        type="button"
        style={{
          padding: ".6rem 1rem",
          background: "red",
          color: "white"
        }}
        onClick={deleteBoard}
      >
        Delete Board
      </button>
      <ColumnList />
      <CreateColumnForm />
    </div>
  );
};

export default MainBoard;
