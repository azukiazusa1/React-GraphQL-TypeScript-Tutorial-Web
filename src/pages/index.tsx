import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { useDeletePostMutation, useMeQuery, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/crateUrqlClient";
import NextLink from "next/link";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { UpdootSection } from "../components/UpdootSection";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data: meData }] = useMeQuery()
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>you got no posts for some reason</div>;
  }
  return (
    <Layout>
      <Flex>
        <Heading>LiReddit</Heading>
      </Flex>
      <br />
      {!data ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing={8}>
          {data.posts.posts.map((p) =>
            !p ? null : (
              <Flex p={5} shadow="md" borderWidth="1px" key={p.id}>
                <UpdootSection post={p} />
                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  posted by {p.creator.username}
                  <Flex align="center">
                    <Text flex={1} mt={4}>
                      {p.textSnippet}
                    </Text>{meData?.me?.id !== p.creator.id ? null : (
                    <EditDeletePostButtons id={p.id} />)}
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
