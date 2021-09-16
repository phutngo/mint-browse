import { ethers } from "ethers";
import { useQuery } from "react-query";
import { getCurrentWalletConnected } from "./interact";
require("dotenv").config();

const { REACT_APP_ETHERSCAN_API, REACT_APP_INFURA_PROJECT_ID } = process.env;

//the query
const getAllTokens = async (contractAddress, contractABI) => {
  const network = "rinkeby";
  const providerOptions = {
    etherscan: REACT_APP_ETHERSCAN_API,
    infura: REACT_APP_INFURA_PROJECT_ID,
  };
  const provider = new ethers.getDefaultProvider(network, providerOptions);
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  try {
    const { address } = await getCurrentWalletConnected();

    const sentLogs = await contract.queryFilter(contract.filters.Transfer(address, null));
    const receivedLogs = await contract.queryFilter(contract.filters.Transfer(null, address));

    const logs = sentLogs
      .concat(receivedLogs)
      .sort((a, b) => a.blockNumber - b.blockNumber || a.transactionIndex - b.transactionIndex);

    const owned = new Set();

    function addressEqual(a, b) {
      return a.toLowerCase() === b.toLowerCase();
    }

    for (const log of logs) {
      const { from, to, tokenId } = log.args;

      if (addressEqual(to, address)) {
        owned.add({
          tokenId: tokenId.toString(),
          tokenURI: await contract.tokenURI(tokenId),
          ownerOf: await contract.ownerOf(tokenId),
          name: await contract.name(),
          symbol: await contract.symbol(),
          balanceOf: await contract.balanceOf(address),
        });
      } else if (addressEqual(from, address)) {
        owned.delete({
          tokenId: tokenId.toString(),
          tokenURI: await contract.tokenURI(tokenId),
          ownerOf: await contract.ownerOf(tokenId),
          name: await contract.name(),
          symbol: await contract.symbol(),
          balanceOf: await contract.balanceOf(address),
        });
      }
    }

    return Array.from(owned);
  } catch (err) {
    return err;
  }
};

//react-query state management for the query above
export const useTokens = (contractAddress, contractABI) => {
  return useQuery({
    queryKey: ["tokens", contractAddress],
    queryFn: () => getAllTokens(contractAddress, contractABI),
    refetchInterval: 2000,
  });
};
