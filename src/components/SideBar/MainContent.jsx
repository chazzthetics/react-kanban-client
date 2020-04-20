import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  selectBoardBackground,
  selectBoardDescription
} from "../../features/boards/boardsSlice";
import { isImage, getBackground } from "../../utils/getBackground";
import { FiTrello, FiSquare } from "react-icons/fi";
import { Box } from "@chakra-ui/core";
import SideBarButton from "./SideBarButton";
import ActivityFeed from "../../features/activities/components/ActivityFeed";

const MainContent = ({
  onShowDescription,
  onShowBackground,
  onShowActivity
}) => {
  const background = useSelector(selectBoardBackground);
  const description = useSelector(selectBoardDescription);

  return (
    <>
      <Box borderBottom="1px solid" borderColor="gray.300" pb={4}>
        <SideBarButton
          text="About This Board"
          subText={description ? "" : "Add a description to your board"}
          alignIcon="flex-start"
          icon={<Box as={FiTrello} size="1.3rem" mr={3} />}
          onClick={onShowDescription}
        />
        <SideBarButton
          text="Change Background"
          icon={
            isImage(background) ? (
              <Box
                mr={3}
                h={21}
                w={21}
                borderRadius={3}
                bgImage={getBackground(background)}
                bgPos="center"
                bgSize="cover"
              />
            ) : (
              <Box
                as={FiSquare}
                size="1.3rem"
                mr={3}
                borderRadius={3}
                color={`${background}.600`}
                bg={`${background}.600`}
              />
            )
          }
          onClick={onShowBackground}
        />
      </Box>

      <ActivityFeed onShow={onShowActivity} count={6} />
    </>
  );
};

MainContent.propTypes = {
  onShowDescription: PropTypes.func.isRequired,
  onShowBackground: PropTypes.func.isRequired,
  onShowActivity: PropTypes.func.isRequired
};

export default MainContent;
