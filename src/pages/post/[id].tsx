import { Box, Heading } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/crateUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

const Post = ({}) => {
  const [{data, error, fetching}] = useGetPostFromUrl()
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