import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { boardsSelectors, changeBoard } from "../boardsSlice";
import { getBackground } from "../../../utils/getBackground";
import { FiTrello } from "react-icons/fi";
import {
  Flex,
  Text,
  Heading,
  PseudoBox,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useDisclosure
} from "@chakra-ui/core";
import IconButton from "../../../components/IconButton";

//FIXME: finish styles, use smaller photos for bgimage etc
const SelectBoardInput = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const boardIds = useSelector(state => boardsSelectors.selectIds(state));

  const boards = useSelector(state => boardsSelectors.selectEntities(state));

  const dispatch = useDispatch();

  const handleChangeBoard = useCallback(
    id => {
      dispatch(changeBoard(id));
      onClose();
    },
    [dispatch, onClose]
  );

  return (
    <Popover
      placement="bottom"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <IconButton
          icon={FiTrello}
          label="Boards"
          fontSize="0.9rem"
          fontWeight={700}
          text="Boards"
        />
      </PopoverTrigger>
      <PopoverContent
        zIndex={4}
        left={0}
        boxShadow="md"
        w="17rem"
        _focus={{ boxShadow: "md", outline: "none" }}
      >
        <PopoverBody>
          <Heading
            as="h4"
            fontSize="0.8rem"
            fontWeight={500}
            textTransform="uppercase"
            color="gray.500"
            py={2}
          >
            Personal Boards
          </Heading>
          {boardIds.map(boardId => (
            <Link
              to={`/b/${boards[boardId].uuid}/${boards[boardId].slug}`}
              key={boardId}
              onClick={() => handleChangeBoard(boards[boardId].uuid)}
            >
              <PseudoBox w="100%" mb={1} h="2.25rem" to="/b">
                <Flex
                  h="100%"
                  align="center"
                  position="relative"
                  borderRadius={3}
                >
                  <PseudoBox
                    h="100%"
                    w="45px"
                    bg={getBackground(boards[boardId].background)}
                    bgImage={getBackground(boards[boardId].background)}
                    bgPos="center"
                    bgSize="cover"
                    borderTopLeftRadius={3}
                    borderBottomLeftRadius={3}
                  />
                  <PseudoBox
                    h="100%"
                    w="100%"
                    opacity={0.1}
                    bg={getBackground(boards[boardId].background)}
                    bgImage={getBackground(boards[boardId].background)}
                    bgPos="center"
                    bgSize="cover"
                    borderTopRightRadius={3}
                    borderBottomRightRadius={3}
                  />
                  <Text
                    fontWeight={600}
                    fontSize="1rem"
                    color="gray.800"
                    textAlign="left"
                    position="absolute"
                    ml={12}
                  >
                    {boards[boardId].title}
                  </Text>
                </Flex>
              </PseudoBox>
            </Link>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SelectBoardInput;
