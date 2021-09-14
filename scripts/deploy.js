
async function main() {
    // Grab the contract factory 
    const Contract = await ethers.getContractFactory("MyPhun");
 
    // Start deployment, returning a promise that resolves to a contract object
    const myContract = await Contract.deploy(); // Instance of the contract 
    console.log("Deploy Transaction:", myContract.deployTransaction); 
    console.log("Contract deployed to address:", myContract.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });