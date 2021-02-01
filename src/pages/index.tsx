import { withUrqlClient } from "next-urql";
import React from "react";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/crateUrqlClient";
import NextLink from 'next/link'
import { Link } from "@chakra-ui/react";
import { Layout } from "../components/Layout";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout>
      <NextLink href="create-post">
      <Link>
        create post
      </Link>
      </NextLink>
      <div>Hello</div>
      {!data ? null : data.posts.map((p) => <div key={p.id}>{p.title}</div>)}
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
