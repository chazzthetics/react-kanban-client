import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectCurrentBoard } from "../../features/boards/boardsSlice";
import { Box } from "@chakra-ui/core";
import { FiTrello, FiSquare } from "react-icons/fi";
import SideBarButton from "./SideBarButton";
import ActivityFeed from "../../features/activities/components/ActivityFeed";

const MainContent = ({
  onShowDescription,
  onShowBackground,
  onShowActivity
}) => {
  const currentBoard = useSelector(selectCurrentBoard);

  return (
    <>
      <Box borderBottom="1px solid" borderColor="gray.300" pb={4}>
        <SideBarButton
          text="About This Board"
          subText={
            !currentBoard?.description ? "Add a description to your board" : ""
          }
          alignIcon="flex-start"
          icon={<Box as={FiTrello} size="1.3rem" mr={3} />}
          onClick={onShowDescription}
        />
        <SideBarButton
          text="Change Background"
          icon={
            <Box
              as={FiSquare}
              size="1.2rem"
              mr={3}
              borderRadius={3}
              color="blue.600"
              backgroundColor="blue.600"
            />
          }
          onClick={onShowBackground}
        />
      </Box>
      <ActivityFeed onShow={onShowActivity} />
    </>
  );
};

MainContent.propTypes = {
  onShowDescription: PropTypes.func.isRequired,
  onShowBackground: PropTypes.func.isRequired,
  onShowActivity: PropTypes.func.isRequired
};

export default MainContent;
