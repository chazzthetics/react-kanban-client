import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectBackgroundIsImage } from "../../features/boards/boardsSlice";
import { Box } from "@chakra-ui/core";
import { FiMoreHorizontal } from "react-icons/fi";
import SideBarContainer from "./SideBarContainer";
import SideBarHeading from "./SideBarHeading";
import MainContent from "./MainContent";
import ActivityContent from "../Activity/ActivityContent";
import DescriptionContent from "../Description/DescriptionContent";
import BackgroundContent from "../Background/BackgroundContent";
import ColorContent from "../Background/ColorContent";
import PhotoContent from "../Background/PhotoContent";
import IconButton from "../IconButton";

const SideBar = ({ isOpen, onOpen, onClose, sidebarTransition }) => {
  const [content, setContent] = useState("main");
  const isImage = useSelector(selectBackgroundIsImage);

  const handleShowPrevious = () => {
    if (content === "colors" || content === "photos") {
      setContent("background");
    } else {
      setContent("main");
    }
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

  const handleShowColors = () => {
    setContent("colors");
  };

  const handleShowPhotos = () => {
    setContent("photos");
  };

  const getSideBarContent = useCallback(show => {
    switch (show) {
      case "activity":
        return <ActivityContent />;
      case "background":
        return (
          <BackgroundContent
            onShowColors={handleShowColors}
            onShowPhotos={handleShowPhotos}
          />
        );
      case "description":
        return <DescriptionContent />;
      case "colors":
        return <ColorContent />;
      case "photos":
        return <PhotoContent />;
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
        isImage={isImage}
        onClick={onOpen}
      />

      <SideBarContainer isOpen={isOpen} sidebarTransition={sidebarTransition}>
        <SideBarHeading
          content={content}
          onClose={onClose}
          onShowPrevious={handleShowPrevious}
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
