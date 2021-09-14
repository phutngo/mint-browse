import React from "react";

import { Box, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";

import { contractAddress, contractABI } from "../utils/CONSTANTS";
import { getTokenMetadata } from "../utils/getTokenMetadata";
import { getNfts } from "../utils/getNfts";

export const Browser = () => {
  //getTokenMetadata- Contract Name and Symbol
  const [tokenMetaData, setTokenMetaData] = useState("");
  useEffect(() => {
    async function getAsync() {
      const tokenMetaData = await getTokenMetadata(contractAddress);
      setTokenMetaData(tokenMetaData);
    }
    getAsync();
  }, []);

  //getNfts
  const [nfts, setNfts] = useState("");
  useEffect(() => {
    async function getAsync() {
      const _nfts = await getNfts(contractAddress, contractABI);
      setNfts(_nfts);
    }
    getAsync();
  }, []);
  console.log("___NFTS___", nfts);

  return (
    <>
      <Paper>
        <Box style={{ textAlign: "center" }} m={1}>
          {tokenMetaData.success ? (
            <>
              <Typography variant='h6'>
                NFT's minted from contract: {tokenMetaData.tokenMetaData.name}
                {" ("}
                {tokenMetaData.tokenMetaData.symbol}
                {")"}
              </Typography>
              <a target="_blank" rel="noreferrer" href={`https://rinkeby.etherscan.io/address/${contractAddress}`} >{contractAddress}</a>
            </>
          ) : null}
        </Box>
      </Paper>
    </>
  );
};
