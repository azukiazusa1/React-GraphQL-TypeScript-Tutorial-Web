import { withTheme } from "@emotion/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../../utils/crateUrqlClient";

const EditPost = ({}) => {
  return ();
};

export default withUrqlClient(createUrqlClient)(EditPost)