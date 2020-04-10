import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createBoard } from "../boardsSlice";
import { makeBoard } from "../../../utils/makeEntity";

const CreateBoardForm = () => {
  const dispatch = useDispatch();
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
  );
};

export default CreateBoardForm;
