import React from "react";
import { NFTE } from "@nfte/react";
import { Box, Typography } from "@material-ui/core";
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
      <Paper>
        <Box style={{ display: "flex", justifyContent: "center" }} m={1}>
          <Typography variant='h6'>
            NFT's minted from: {tokenMetaData.tokenMetaData.name}
            {" ("}
            {tokenMetaData.tokenMetaData.symbol}
            {")"}
          </Typography>
        </Box>
        <Box style={{ display: "flex", justifyContent: "center" }} m={1}>
          <NFTE contract='0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0' tokenId='18552' />
        </Box>
      </Paper>
    </>
  );
};
