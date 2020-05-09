import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { columnsSelectors, copyColumn } from "../columnsSlice";
import { selectCurrentBoardId } from "../../boards/boardsSlice";
import { tasksSelectors } from "../../tasks/tasksSlice";
import {
  makeColumn,
  makeTask,
  makeChecklistItem
} from "../../../utils/makeEntity";
import { Box, FormControl, FormLabel, Input } from "@chakra-ui/core";
import SaveButton from "../../../components/SaveButton";
import { nanoid } from "../../../utils/nanoid";

//FIXME: refactor
const CopyList = ({ columnId, onClose, firstFieldRef }) => {
  const currentBoardId = useSelector(selectCurrentBoardId);

  const column = useSelector(state =>
    columnsSelectors.selectById(state, columnId)
  );

  const columnTasks = useSelector(state =>
    tasksSelectors.selectEntities(state)
  );

  const { register, handleSubmit } = useForm({
    defaultValues: { title: column.title }
  });

  const dispatch = useDispatch();

  //TODO: refactor
  const onSubmit = useCallback(
    data => {
      const copiedTasks = column.tasks.map(task => ({
        ...columnTasks[task],
        uuid: nanoid(),
        checklist: columnTasks[task].checklist
          ? {
              uuid: nanoid(),
              title: columnTasks[task].checklist.title,
              items: columnTasks[task].checklist.items.map(item =>
                makeChecklistItem(item.title)
              )
            }
          : null,
        activities: [
          {
            id: nanoid(),
            description: "created",
            changes: {},
            recordable_type: "App/Task",
            created_at: new Date()
          }
        ] //FIXME: sample
      }));

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
    [dispatch, column, columnTasks, columnId, currentBoardId, onClose]
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
