
async function main() {
    // Grab the contract factory 
    const MyNFT = await ethers.getContractFactory("Phunft");
 
    // Start deployment, returning a promise that resolves to a contract object
    const myNFT = await MyNFT.deploy(); // Instance of the contract 
    console.log("Deploy Transaction:", myNFT.deployTransaction); 
    console.log("Contract deployed to address:", myNFT.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });