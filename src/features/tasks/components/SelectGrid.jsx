import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { usePopulateSelect } from "../../../hooks/usePopulateSelect";
import { Flex } from "@chakra-ui/core";
import SelectBox from "../../../components/SelectBox";

const SelectGrid = forwardRef(
  ({ selectedIds, columnId, move = false, copy = false }, ref) => {
    const { boards, columns, boardColumns, tasks } = usePopulateSelect({
      selectedIds,
      columnId
    });

    return (
      <>
        <SelectBox label="Board" name="board" ref={ref}>
          {boards &&
            boards
              .filter(board => board.columns.length > 0)
              .map(board => (
                <option key={board.uuid} value={board.uuid}>
                  {board.title}
                </option>
              ))}
        </SelectBox>
        <Flex>
          <SelectBox label="List" name="list" w="67.5%" mr="2.5%" ref={ref}>
            {boardColumns &&
              boardColumns.map(column => (
                <option key={column} value={column}>
                  {columns[column].title}
                </option>
              ))}
          </SelectBox>
          <SelectBox label="Position" name="position" w="30.5%" ref={ref}>
            {tasks.length === 0 ? (
              <option key="first" value={0}>
                1
              </option>
            ) : (
              <>
                {tasks.map((task, index) => (
                  <option key={task} value={index}>
                    {index + 1}
                  </option>
                ))}
                {(move && selectedIds.list !== columnId) || copy ? (
                  <option key="last" value={tasks.length}>
                    {tasks.length + 1}
                  </option>
                ) : null}
              </>
            )}
          </SelectBox>
        </Flex>
      </>
    );
  }
);

SelectGrid.propTypes = {
  selectedIds: PropTypes.object.isRequired,
  columnId: PropTypes.string.isRequired,
  move: PropTypes.bool,
  copy: PropTypes.bool
};

export default SelectGrid;
