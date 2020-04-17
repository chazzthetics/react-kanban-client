import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Box } from "@chakra-ui/core";
import { FiMoreHorizontal } from "react-icons/fi";
import SideBarContainer from "./SideBarContainer";
import SideBarHeading from "./SideBarHeading";
import MainContent from "./MainContent";
import DescriptionContent from "../Description/DescriptionContent";
import ActivityContent from "../Activity/ActivityContent";
import IconButton from "../IconButton";

const SideBar = ({ isOpen, onOpen, onClose, sidebarTransition }) => {
  const [content, setContent] = React.useState("main");

  const handleShowMain = () => {
    setContent("main");
  };

  const handleShowDescription = () => {
    setContent("description");
  };

  const handleShowBackground = () => {
    setContent("background");
  };

  const handleShowActivity = () => {
    setContent("activity");
  };

  const getSideBarContent = useCallback(show => {
    switch (show) {
      case "activity":
        return <ActivityContent />;
      case "background":
        return <h1>Background</h1>;
      case "description":
        return <DescriptionContent />;
      default:
        return (
          <MainContent
            onShowActivity={handleShowActivity}
            onShowBackground={handleShowBackground}
            onShowDescription={handleShowDescription}
          />
        );
    }
  }, []);

  return (
    <>
      <IconButton
        label="Open Menu"
        icon={FiMoreHorizontal}
        text="Show Menu"
        fontSize="0.875rem"
        onClick={onOpen}
      />

      <SideBarContainer isOpen={isOpen} sidebarTransition={sidebarTransition}>
        <SideBarHeading
          content={content}
          onClose={onClose}
          onShowPrevious={handleShowMain}
        />
        <Box pt={4} pb={2} borderBottom="1px solid" borderColor="gray.300">
          {getSideBarContent(content)}
        </Box>
      </SideBarContainer>
    </>
  );
};

SideBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  sidebarTransition: PropTypes.string.isRequired
};

export default SideBar;
