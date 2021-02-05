import React from "react";
import NextLink from "next/link";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import { useDeletePostMutation } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({id}) => {
  const [, deletePost] = useDeletePostMutation();
  return (
    <Box ml="auto">
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          mr={4}
          ml="auto"
          icon={<EditIcon />}
          aria-label="Edit post"
        />
      </NextLink>
      <IconButton
        ml="auto"
        onClick={() => {
          deletePost({ id });
        }}
        icon={<DeleteIcon />}
        aria-label="Delete post"
      />
    </Box>
  );
};
