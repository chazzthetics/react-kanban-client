import React from "react";
import PropTypes from "prop-types";
import { Flex, Image, Link, Heading, CloseButton } from "@chakra-ui/core";
import PexelsLogo from "../../images/pexels.png";
import BackButton from "../BackButton";

const SideBarHeading = ({ content, onShowPrevious, onClose }) => {
  return (
    <Flex
      className="SideBarHeader"
      align="center"
      py={4}
      borderBottom="1px solid"
      borderColor="gray.300"
      position="relative"
    >
      {content !== "main" && <BackButton onClick={onShowPrevious} />}
      <Heading
        as="h3"
        fontSize="1rem"
        fontWeight={600}
        textAlign="center"
        flex={1}
        color="gray.900"
      >
        <Flex justify="center" align="center">
          {getHeading(content)}
          {content === "photos" && (
            <Link
              href="https://www.pexels.com/"
              rel="noopener noreferrer"
              target="_blank"
              _focus={{ outline: "none" }}
            >
              <Image
                src={PexelsLogo}
                alt="Photos provided by Pexels"
                h="1.75rem"
                objectFit="cover"
                ml={2}
              />
            </Link>
          )}
        </Flex>
      </Heading>
      <CloseButton
        onClick={onClose}
        aria-label="Close sidebar"
        opacity={0.5}
        position="absolute"
        right={0}
        _active={{ boxShadow: "none" }}
        _focus={{ boxShadow: "none" }}
        _hover={{ opacity: 0.8 }}
      />
    </Flex>
  );
};

SideBarHeading.propTypes = {
  content: PropTypes.string.isRequired,
  onShowPrevious: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

function getHeading(content) {
  switch (content) {
    case "activity":
      return "Activity";
    case "description":
      return "About This Board";
    case "background":
      return "Change Background";
    case "main":
      return "Menu";
    case "colors":
      return "Colors";
    case "photos":
      return "Photos by";
    default:
      return "Menu";
  }
}

export default SideBarHeading;
