const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.getContractFactory("Upload");
  const upload = await Upload.deploy();
//await upload.deployed();
await upload.waitForDeployment();
console.log(
  `Lock with ETH and unlock timestamp deployed to ${upload.target}`
);

const NFT = await hre.ethers.getContractFactory("NFT");
const nft = await NFT.deploy();
//await upload.deployed();
await upload.waitForDeployment();
console.log(
`Lock with ETH and unlock timestamp deployed to ${nft.target}`
);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
