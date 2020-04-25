import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectCurrentBoard } from "../../features/boards/boardsSlice";
import { backgroundColors } from "../../utils/backgroundColors";
import { isImage } from "../../utils/getBackground";
import { PseudoBox, Flex } from "@chakra-ui/core";
import BackgroundBox from "./BackgroundBox";

const defaultBackground =
  "https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280";

const BackgroundContent = ({ onShowColors, onShowPhotos }) => {
  const { background } = useSelector(selectCurrentBoard);

  return (
    <Flex>
      {/* Photos */}
      <BackgroundBox
        image={
          isImage(background)
            ? `url(${background})`
            : `url(${defaultBackground})`
        }
        text="Photos"
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        onClick={onShowPhotos}
      />

      {/* Colors */}
      <BackgroundBox background="gray.300" text="Colors" onClick={onShowColors}>
        <Flex h="100%">
          {backgroundColors.map(color => (
            <PseudoBox
              key={color}
              bg={`${color}.600`}
              w="10%"
              h="100%"
              _first={{ borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}
              _last={{ borderTopRightRadius: 4, borderBottomRightRadius: 4 }}
            />
          ))}
        </Flex>
      </BackgroundBox>
    </Flex>
  );
};

BackgroundContent.propTypes = {
  onShowColors: PropTypes.func.isRequired,
  onShowPhotos: PropTypes.func.isRequired
};

export default BackgroundContent;
