import React from "react";

import { Box, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";

import { contractAddress, contractABI } from "../utils/CONSTANTS";
import { getTokenMetadata } from "../utils/getTokenMetadata";
import { useTokens } from "../utils/useTokens";

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

  const { isLoading, error, data: tokensData } = useTokens(contractAddress, contractABI);

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
              <a target='_blank' rel='noreferrer' href={`https://rinkeby.etherscan.io/address/${contractAddress}`}>
                {contractAddress}
              </a>
            </>
          ) : null}
        </Box>
        <Box>
          <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start'>
            {tokensData &&
              tokensData.map((token, index) => {
                return (
                  <div key={token.tokenId.toString()}>
                    <Typography>
                      {token.tokenId} {token.tokenURI}{" "}
                    </Typography>
                  </div>
                );
              })}
          </Grid>
        </Box>
      </Paper>
    </>
  );
};
