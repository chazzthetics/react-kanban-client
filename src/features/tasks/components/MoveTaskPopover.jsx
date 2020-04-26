import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  boardsSelectors,
  selectCurrentBoardId
} from "../../boards/boardsSlice";
import { columnsSelectors } from "../../columns/columnsSlice";
import { tasksSelectors, reorderTask, reorderBetween } from "../tasksSlice";
import { reorder } from "../../../utils/reorder";
import { Box, Flex, Heading } from "@chakra-ui/core";
import PopoverContainer from "../../../components/PopoverContainer";
import SideModalTrigger from "../../../components/SideModalTrigger";
import SelectBox from "../../../components/SelectBox";
import SaveButton from "../../../components/SaveButton";

// FIXME: close only popover after submit
const MoveTaskPopover = ({ taskId, columnId }) => {
  const dispatch = useDispatch();
  const currentBoardId = useSelector(selectCurrentBoardId);

  const { position } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  const { register, handleSubmit, watch } = useForm({
    defaultValues: { board: currentBoardId, list: columnId, position }
  });

  const selectedIds = watch(["board", "list"]);

  const { columns: endColumns } = useSelector(state =>
    boardsSelectors.selectById(state, selectedIds.board)
  );

  const boards = useSelector(state => boardsSelectors.selectAll(state));

  const columns = useSelector(state => columnsSelectors.selectEntities(state));

  const { tasks: startTasks } = useSelector(state =>
    columnsSelectors.selectById(state, columnId)
  );
  const { tasks: endTasks } = useSelector(state =>
    columnsSelectors.selectById(state, selectedIds.list)
  );

  //FIXME: refactor everything
  const onSubmit = useCallback(
    data => {
      const endIndex = parseInt(data.position);

      // Move task inside same column
      if (columnId === selectedIds.list) {
        const startIndex = startTasks.indexOf(taskId);
        const newOrder = reorder(endTasks, startIndex, endIndex);
        dispatch(reorderTask({ columnId, newOrder: newOrder }));
      }

      // Move task to another column
      if (
        columnId !== selectedIds.list ||
        currentBoardId !== selectedIds.board
      ) {
        const startIndex = startTasks.indexOf(taskId);
        const startOrder = [...startTasks];
        const [removed] = startOrder.splice(startIndex, 1);
        const endOrder = [...endTasks];
        endOrder.splice(endIndex, 0, removed);
        dispatch(
          reorderBetween({
            startColumnId: columnId,
            endColumnId: selectedIds.list,
            startOrder,
            endOrder
          })
        );
      }
      return;
    },
    [
      dispatch,
      columnId,
      currentBoardId,
      endTasks,
      selectedIds,
      startTasks,
      taskId
    ]
  );

  return (
    <PopoverContainer
      trigger={<SideModalTrigger icon="arrow-forward" label="Move" />}
      heading="Move Card"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box pb={4}>
          <Heading
            as="h4"
            fontSize="0.9rem"
            fontWeight={400}
            pt={3}
            pb={2}
            textTransform="uppercase"
          >
            Select Destination
          </Heading>
          <SelectBox label="Board" name="board" ref={register}>
            {boards &&
              boards.map(board => (
                <option key={board.uuid} value={board.uuid}>
                  {board.title}
                </option>
              ))}
          </SelectBox>
          <Flex>
            <SelectBox
              label="List"
              name="list"
              w="67.5%"
              mr="2.5%"
              ref={register}
            >
              {endColumns &&
                endColumns.map(column => (
                  <option key={column} value={column}>
                    {columns[column].title}
                  </option>
                ))}
            </SelectBox>
            <SelectBox
              label="Position"
              name="position"
              w="30.5%"
              ref={register}
            >
              {endTasks.length === 0 ? (
                <option key="first" value={0}>
                  1
                </option>
              ) : (
                <>
                  {endTasks.map((task, index) => (
                    <option key={task} value={index}>
                      {index + 1}
                    </option>
                  ))}
                  {selectedIds.list !== columnId && (
                    <option key="last" value={endTasks.length}>
                      {endTasks.length + 1}
                    </option>
                  )}
                </>
              )}
            </SelectBox>
          </Flex>
          <SaveButton label="Move" mt={2} px={6} />
        </Box>
      </form>
    </PopoverContainer>
  );
};

MoveTaskPopover.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired
};

export default MoveTaskPopover;
