import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentBoardId,
  updateBoardBackground
} from "../../features/boards/boardsSlice";
import { Flex } from "@chakra-ui/core";
import BackgroundBox from "./BackgroundBox";

const PhotoContent = () => {
  const boardId = useSelector(selectCurrentBoardId);
  const dispatch = useDispatch();

  const handleUpdateBackground = useCallback(
    background => {
      dispatch(updateBoardBackground({ boardId, background }));
    },
    [dispatch, boardId]
  );

  return (
    <Flex wrap="wrap">
      <BackgroundBox
        image="url('https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=160&w=96')"
        backgroundPosition="center"
        onClick={() =>
          handleUpdateBackground(
            "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=973&w=1260"
          )
        }
      />
      <BackgroundBox
        image="url('https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=160&w=96')"
        onClick={() =>
          handleUpdateBackground(
            "https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=973&w=1260"
          )
        }
      />
      <BackgroundBox
        image="url('https://images.pexels.com/photos/839462/pexels-photo-839462.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=160&w=96')"
        onClick={() =>
          handleUpdateBackground(
            "https://images.pexels.com/photos/839462/pexels-photo-839462.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=973&w=1260"
          )
        }
      />
      <BackgroundBox
        image="url('https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&dpr=2&h=160&w=96')"
        onClick={() =>
          handleUpdateBackground(
            "https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&dpr=2&h=973&w=1260"
          )
        }
      />
      <BackgroundBox
        image="url('https://images.pexels.com/photos/4827/nature-forest-trees-fog.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=160&w=96')"
        onClick={() =>
          handleUpdateBackground(
            "https://images.pexels.com/photos/4827/nature-forest-trees-fog.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=973&w=1260"
          )
        }
      />
      <BackgroundBox
        image="url('https://images.pexels.com/photos/733475/pexels-photo-733475.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=160&w=96')"
        onClick={() =>
          handleUpdateBackground(
            "https://images.pexels.com/photos/733475/pexels-photo-733475.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=973&w=1260"
          )
        }
      />
    </Flex>
  );
};

export default PhotoContent;
