const { ethers } = require('hardhat')
const {getWeth} = require('../scripts/weth')
async function main(){
    await getWeth()
    const [deployer] = await ethers.getSigners()
    const lending_Pool = await getLendingPool(deployer)
    console.log(`lending pool contract address is ${lending_Pool.address}`);
}

async function getLendingPool(account){
    const contract = await ethers.getContractAt(
    'ILendingPoolAddressesProvider',
    '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5',
    account)

    const lendingPoolAddress = await contract.getLendingPool()
    const lending_Pool = await ethers.getContractAt('ILendingPool',lendingPoolAddress,account)
    return lending_Pool

}

async function approveErc20(){
    
}
main()
.then(()=> process.exit(0))
.catch((error)=>{
    console.log(error);
    process.exit(1)
})