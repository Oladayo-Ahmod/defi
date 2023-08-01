const {getNamedAccounts, ethers} = require('hardhat')

const AMOUNT = ethers.utils.parseEther('0.02')
const [deployer] = await ethers.getSigners() // get the deployer
async function getWeth() {
    const contract = await ethers.getContractAt('IWeth','0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',deployer
    )

    const tx =await contract.deposit({value : AMOUNT})
    await tx.wait(1)
    const wethBalance = await contract.balanceOf(deployer.address)
    console.log(wethBalance.toString());
}

async function lendingPool(account){
    const contract = await ethers.getContractAt(
    'ILendingPoolAddressesProvider',
    '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5',
    account)

    const lendingPoolAddress = await contract.getLendingPool()
    const lending_Pool = await ethers.getContractAt('ILendingPool',lendingPoolAddress,account)
    return lending_Pool


}
module.exports = {
    getWeth,
    lendingPool
}