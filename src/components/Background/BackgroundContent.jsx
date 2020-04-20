import React from "react";
import PropTypes from "prop-types";
import BackgroundBox from "./BackgroundBox";
import { Flex } from "@chakra-ui/core";

const BackgroundContent = ({ onShowColors, onShowPhotos }) => {
  return (
    <Flex>
      <BackgroundBox
        background="red.300"
        text="Photos"
        onClick={onShowPhotos}
      />
      <BackgroundBox
        background="blue.300"
        text="Colors"
        onClick={onShowColors}
      />
    </Flex>
  );
};

BackgroundContent.propTypes = {
  onShowColors: PropTypes.func.isRequired,
  onShowPhotos: PropTypes.func.isRequired
};

export default BackgroundContent;
