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
