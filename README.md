# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

```
npx hardhat
```

## Installation / Getting Started
[Hardhat Getting Started](https://hardhat.org/getting-started/)

Hardhat is used through a local installation in your project. This way your environment will be reproducible, and you will avoid future version conflicts.

To install it, you need to create an npm project by going to an empty folder, running `npm init`, and following its instructions. Once your project is ready, you should run

INSTEAD of `npm init` this repo used:

```
npx create-react-app my-cra-hardhat
```
then

```
npm install --save-dev hardhat
```

To use your local installation of Hardhat, you need to use `npx` to run it (i.e. `npx hardhat`).

To create your Hardhat project run npx hardhat in your project folder.
```
npx hardhat
```

then **install dependencies - hardhat will tell you how**

## Compile
Compile .sol files in the contracts folder

```
npx hardhat compile
```

files are then generated in the artifacts\ folder.
note that `artifacts\hardhat\console.sol` was automatically compiled along with our `artifacts\contracts\Greeter.sol` file.

## Test

You can run your tests - files in the test folder
```
npx hardhat test
```

## Deploy

Next, to deploy the contract we will use a Hardhat script. Inside scripts/ you will find sample-script.js.

Run it with:
```
npx hardhat run scripts/sample-script.js
```

## Connecting a wallet or Dapp to Hardhat Network
Hardhat will always spin up an in-memory instance of Hardhat Network on startup by default. 

It's also possible to run Hardhat Network in a standalone fashion so that external clients can connect to it. This could be MetaMask, your Dapp front-end, or a script.

To run Hardhat Network in this way, run 
```
npx hardhat node
```

This will expose a JSON-RPC interface to Hardhat Network. To use it connect your wallet or application to http://localhost:8545.

If you want to connect Hardhat to this node to, for example, run a deployment script against it, you simply need to run it using --network localhost.

To try this, start a node with npx hardhat node and re-run the sample script using the network option:

```
npx hardhat run scripts/sample-script.js --network localhost
```
In summary the command above deploys the Greeter to localhost instead of the default in-memory Hardhat Network

## Configuration

https://hardhat.org/config/

configure to default run JSON-RPC localhh instead of the inmemory hardhat network. 

This means that when deploying don't have to specify --network localhost. can just use this

```
npx hardhat run scripts/sample-script.js
```

## Starting up an existing project
```js
npx hardhat node //starts up JSON-RPC Hardhat Network 
npx hardhat run scripts/sample-script.js // this script does a deployment of whatever .sol files is specified inside it
```

## TODO
What's missing with this setup is a frontend to interact with the smart contract - use Scaffold.eth.