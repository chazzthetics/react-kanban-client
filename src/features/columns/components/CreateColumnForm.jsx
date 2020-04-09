import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBoardColumnCount,
  selectCurrentBoardId
} from "../../boards/boardsSlice";
import { createColumn } from "../columnsSlice";
import { useForm } from "react-hook-form";
import { nanoid } from "../../../utils/nanoid";

const CreateColumnForm = () => {
  const dispatch = useDispatch();
  const currentBoardId = useSelector(selectCurrentBoardId);

  const position = useSelector(selectBoardColumnCount);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = useCallback(
    data => {
      const column = makeColumn(data.columnTitle, position);
      dispatch(createColumn({ column, boardId: currentBoardId }));
      reset();
    },
    [dispatch, reset, position, currentBoardId]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Add new list"
        style={{ border: "1px solid black" }}
        name="columnTitle"
        ref={register}
      />
      <button type="submit">Add</button>
    </form>
  );
};

function makeColumn(title, position) {
  return {
    uuid: nanoid(),
    title,
    position,
    is_locked: false,
    is_editing: false,
    tasks: []
  };
}

export default CreateColumnForm;
