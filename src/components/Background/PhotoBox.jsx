import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  creditHovered,
  photosSelectors
} from "../../features/photos/photosSlice";
import {
  updateBoardBackground,
  selectCurrentBoardId
} from "../../features/boards/boardsSlice";
import BackgroundBox from "./BackgroundBox";
import { Flex, Link } from "@chakra-ui/core";

const PhotoBox = ({ photoId }) => {
  const dispatch = useDispatch();
  const boardId = useSelector(selectCurrentBoardId);

  const handleUpdateBackground = useCallback(
    background => {
      dispatch(updateBoardBackground({ boardId, background }));
    },
    [dispatch, boardId]
  );

  const photo = useSelector(state =>
    photosSelectors.selectById(state, photoId)
  );

  const handleHoverCredit = useCallback(
    id => {
      dispatch(creditHovered({ photoId: id }));
    },
    [dispatch]
  );

  return (
    <BackgroundBox
      key={photoId}
      image={`url(${photo.src.small})`}
      backroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      position="relative"
      onClick={() => handleUpdateBackground(photo.src.large2x)}
      onMouseEnter={() => handleHoverCredit(photoId)}
      onMouseLeave={() => handleHoverCredit(photoId)}
    >
      {photo.isShown ? (
        <Flex
          position="absolute"
          bottom={0}
          bg="rgba(0,0,0,0.3)"
          w="100%"
          h="1.5rem"
          borderBottomLeftRadius={4}
          borderBottomRightRadius={4}
          align="center"
          className="credit-overlay"
        >
          <Link
            fontSize="0.7rem"
            ml={2}
            alignSelf="center"
            color="white"
            href={photo.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Photo provided by Pexels"
            _focus={{ outline: "none" }}
            isTruncated={true}
          >
            {photo.photographer}
          </Link>
        </Flex>
      ) : null}
    </BackgroundBox>
  );
};

export default memo(PhotoBox);
