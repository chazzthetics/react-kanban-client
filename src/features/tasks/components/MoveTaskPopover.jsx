import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  boardsSelectors,
  selectCurrentBoardId
} from "../../boards/boardsSlice";
import { columnsSelectors } from "../../columns/columnsSlice";
import { tasksSelectors } from "../tasksSlice";
import { Box, Flex, Heading } from "@chakra-ui/core";
import PopoverContainer from "../../../components/PopoverContainer";
import SideModalTrigger from "../../../components/SideModalTrigger";
import SelectBox from "../../../components/SelectBox";
import SaveButton from "../../../components/SaveButton";

// FIXME:
const MoveTaskPopover = ({ taskId, columnId }) => {
  const currentBoardId = useSelector(selectCurrentBoardId);

  const { position } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  const { register, handleSubmit, watch } = useForm({
    defaultValues: { board: currentBoardId, list: columnId, position }
  });

  const selectedIds = watch(["board", "list"]);

  const { columns: boardColumns } = useSelector(state =>
    boardsSelectors.selectById(state, selectedIds.board)
  );

  const boards = useSelector(state => boardsSelectors.selectAll(state));

  const columns = useSelector(state => columnsSelectors.selectEntities(state));
  const { tasks } = useSelector(state =>
    columnsSelectors.selectById(state, selectedIds.list)
  );

  // console.log(selectedIds);

  const onSubmit = data => {
    // console.log(data);
  };

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
            {boards.map(board => (
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
              {boardColumns.map(column => (
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
              {tasks.map((task, index) => (
                <option key={task} value={index}>
                  {index + 1}
                </option>
              ))}
            </SelectBox>
          </Flex>
          <SaveButton label="Move" mt={2} px={6} />
        </Box>
      </form>
    </PopoverContainer>
  );
};

MoveTaskPopover.propTypes = {};

export default React.memo(MoveTaskPopover);
