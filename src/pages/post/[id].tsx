import { Box, Heading } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { usePostQuery, usePostsQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/crateUrqlClient";

const Post = ({}) => {
  const router = useRouter()
  const id = typeof router.query.id === 'string' ? parseInt(router.query.id) : -1
  const [{data, error, fetching}] = usePostQuery({
    pause: id === -1,
    variables: {
      id
    }
  })
  if (fetching) {
    return (
      <Layout>
        <div>loadign...</div>
      </Layout>
    )
  }
  if (error) {
    return <div>{error?.message}</div>
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <Heading>{data.post.title}</Heading>
      {data?.post?.text}
    </Layout>
  );

};

export default withUrqlClient(createUrqlClient, { ssr: true})(Post)