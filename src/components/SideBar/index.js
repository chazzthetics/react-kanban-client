import React from "react";
import PropTypes from "prop-types";
import { Box, Heading, Flex, Text, Textarea, Button } from "@chakra-ui/core";
import { FiMoreHorizontal } from "react-icons/fi";
import SideBarContainer from "./SideBarContainer";
import SideBarHeading from "./SideBarHeading";
import MainContent from "./MainContent";
import DescriptionContent from "./DescriptionContent";
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

  const getSideBarContent = show => {
    switch (show) {
      case "activity":
        return <h1>Activity</h1>;
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
  };

  return (
    <>
      {/* SideBar Trigger */}
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
        <Box py={4} borderBottom="1px solid" borderColor="gray.200">
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
