import React from "react";
import PropTypes from "prop-types";
import { Grid, Box, Heading } from "@chakra-ui/core";
import BoardBox from "./BoardBox";
import CreateBoardModal from "./CreateBoardModal";

const BoardGrid = ({ icon, heading, boards }) => {
  return (
    <Box gridColumn="2" pb={10}>
      <Heading
        as="h2"
        fontSize="1.1rem"
        fontWeight={700}
        display="flex"
        alignItems="center"
        mb={4}
      >
        <Box as={icon} aria-label={heading} mr={3} fontSize="1.5rem" />
        {heading}
      </Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        {boards.map(board => (
          <BoardBox key={board.uuid} board={board} />
        ))}
        {heading === "Personal Boards" && <CreateBoardModal />}
      </Grid>
    </Box>
  );
};

BoardGrid.propTypes = {
  icon: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  boards: PropTypes.array.isRequired
};

export default BoardGrid;
