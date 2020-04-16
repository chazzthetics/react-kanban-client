import React from "react";
import { FiUser, FiAlignLeft } from "react-icons/fi";
import ContentHeading from "./ContentHeading";
import UserDescription from "./UserDescription";
import DescriptionForm from "./DescriptionForm";

const DescriptionContent = () => {
  return (
    <>
      <ContentHeading icon={FiUser} heading="Made by" />
      <UserDescription />
      <ContentHeading icon={FiAlignLeft} heading="Description" />
      <DescriptionForm />
    </>
  );
};

export default DescriptionContent;
