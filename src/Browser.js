import React from "react";
import { NFTE } from "@nfte/react";
import { Box } from "@material-ui/core";
import { getTokenMetadata } from "./utils/getTokenMetadata";
import { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";

export const Browser = () => {
  const [tokenMetaData, setTokenMetaData] = useState("");

  useEffect(() => {
    async function getAsync() {
      const tokenMetaData = await getTokenMetadata();
      setTokenMetaData(tokenMetaData);
    }
    getAsync();
  }, []);

  return (
    <>
      <Box style={{ display: "flex", justifyContent: "center" }} m={1}>
        <Paper> {JSON.stringify(tokenMetaData)} </Paper>
        <NFTE contract='0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0' tokenId='18552' />
      </Box>
    </>
  );
};
