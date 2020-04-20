import React from "react";
import PropTypes from "prop-types";
import BackgroundBox from "./BackgroundBox";
import { backgroundColors } from "../../utils/backgroundColors";
import { PseudoBox, Flex } from "@chakra-ui/core";

const BackgroundContent = ({ onShowColors, onShowPhotos }) => {
  return (
    <Flex>
      <BackgroundBox
        image="url('https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=160&w=96')"
        text="Photos"
        onClick={onShowPhotos}
      />
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
