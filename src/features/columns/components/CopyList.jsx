import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { columnsSelectors, copyColumn } from "../columnsSlice";
import { selectCurrentBoardId } from "../../boards/boardsSlice";
import { tasksSelectors } from "../../tasks/tasksSlice";
import { makeColumn, copyTasks } from "../../../utils/makeEntity";
import { Box, FormControl, FormLabel, Input } from "@chakra-ui/core";
import SaveButton from "../../../components/SaveButton";

//FIXME: refactor
const CopyList = ({ columnId, onClose, firstFieldRef }) => {
  const currentBoardId = useSelector(selectCurrentBoardId);

  const column = useSelector(state =>
    columnsSelectors.selectById(state, columnId)
  );

  const tasks = useSelector(state => tasksSelectors.selectEntities(state));

  const { register, handleSubmit } = useForm({
    defaultValues: { title: column.title }
  });

  const dispatch = useDispatch();

  //TODO: refactor
  const onSubmit = useCallback(
    data => {
      const copiedTasks = copyTasks(column.tasks, tasks);

      const copiedColumn = {
        ...makeColumn(data.title, column.position + 1),
        tasks: copiedTasks.map(task => task.uuid)
      };

      dispatch(
        copyColumn({
          boardId: currentBoardId,
          columnId,
          column: copiedColumn,
          tasks: copiedTasks
        })
      );
      onClose();
    },
    [dispatch, column, tasks, columnId, currentBoardId, onClose]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box px={3} pb={2}>
        <FormControl>
          <FormLabel htmlFor="title" fontSize="0.875rem" opacity={0.8}>
            Title
          </FormLabel>
          <Input
            name="title"
            aria-label="title"
            id="title"
            type="text"
            size="sm"
            autoComplete="off"
            ref={e => {
              register(e, { required: true, maxLength: 30 });
              firstFieldRef.current = e;
            }}
          />
        </FormControl>
        <SaveButton label="Create List" mt={4} px={6} />
      </Box>
    </form>
  );
};

CopyList.propTypes = {
  columnId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  firstFieldRef: PropTypes.object.isRequired
};
export default CopyList;
