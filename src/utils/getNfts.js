import { ethers } from "ethers";
require("dotenv").config();

export const getNfts = async (contractAddress, contractABI) => {
  //https://docs.ethers.io/v5/api-keys/
  const network = "ropsten";
  // Specify your own API keys. Each is optional, and if you omit it the default API key for that service will be used.
  const providerOptions = {
    etherscan: process.env.ETHERSCAN_API,
    //infura: YOUR_INFURA_PROJECT_ID,
    //Or if using a project secret:
    infura: {
      projectId: process.env.INFURA_PROJECT_ID,
      projectSecret: process.env.INFURA_PROJECT_SECRET,
    },
    //alchemy: process.env.REACT_APP_ALCHEMY_KEY,
  };
  const provider = new ethers.getDefaultProvider(network, providerOptions);
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  try {
    const data = await contract.ownerOf(3);
    //console.log("data: ", data);
    return data;
  } catch (err) {
    //console.log("Error: ", err);
    return err;
  }
};
