import React from "react";
import PropTypes from "prop-types";
import { Box, Heading, Flex, Text, Textarea, Button } from "@chakra-ui/core";
import { FiMoreHorizontal } from "react-icons/fi";
import SideBarContainer from "./SideBarContainer";
import SideBarHeading from "./SideBarHeading";
import MainContent from "./MainContent";
import DescriptionContent from "./DescriptionContent";
import ActivityContent from "./ActivityContent";
import IconButton from "../IconButton";
import ActivityFeed from "../../features/activities/components/ActivityFeed";

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
        <Box py={4} borderBottom="1px solid" borderColor="gray.300">
          {getSideBarContent(content)}
        </Box>
        {content === "activity" && <ActivityFeed />}
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
