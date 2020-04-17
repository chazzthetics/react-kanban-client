import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { makeSelectColumnTaskCount } from "../../columns/columnsSlice";
import { PseudoBox, Icon } from "@chakra-ui/core";

const CreateTaskButton = ({ columnId, onShow }) => {
  const selectColumnTaskCount = useMemo(makeSelectColumnTaskCount, []);
  const taskCount = useSelector(state =>
    selectColumnTaskCount(state, columnId)
  );

  return (
    <PseudoBox
      as="button"
      color="gray.700"
      fontSize="0.9rem"
      px={2}
      py={1}
      aria-label="Add a card"
      display="flex"
      alignItems="center"
      w="100%"
      _hover={{ backgroundColor: "rgba(9,30,66,.08)", borderRadius: 3 }}
      _active={{ backgroundColor: "rgba(9,30,66,.13)" }}
      _focus={{ outline: "none" }}
      onClick={onShow}
    >
      <Icon name="add" color="gray.700" fontSize="0.7rem" mr={2} />
      {taskCount === 0 ? "Add a card" : "Add another card"}
    </PseudoBox>
  );
};

CreateTaskButton.propTypes = {
  columnId: PropTypes.string.isRequired,
  onShow: PropTypes.func.isRequired
};

export default CreateTaskButton;
