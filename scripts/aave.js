const { ethers } = require('hardhat')
const {getWeth,lendingPool} = require('../scripts/weth')
async function main(){
    await getWeth()
    const [deployer] = await ethers.getSigners()
    const lending_Pool = await lendingPool(deployer.address)
    console.log(`lending pool contract address is ${lending_Pool}`);
}

main()
.then(()=> process.exit(0))
.catch((error)=>{
    console.log(error);
    process.exit(1)
})